import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1sxdmac/upload";
const CLOUDINARY_PRESET = "hotel_preset";

interface PropertyData {
  _id: string;
  address: string;
  size: string;
  category: string;
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: string;
  date_of_creation: string;
  rooms: string;
  price: string;
  bathrooms: string;
  visits: {
    dates: string[];
  };
  amenities: {
    parking: boolean;
    ac: boolean;
    furnished: boolean;
    pool: boolean;
    microwave: boolean;
    near_subway: boolean;
    beach_view: boolean;
    alarm: boolean;
    garden: boolean;
  };
  contact_info: string;
  status: string;
  notification: string;
  iduser: string;
}

const PostProperty = () => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    _id: "1",
    address: "123 Main Street, Cityville, State",
    size: "120",
    category: "apartment",
    title: "Modern Apartment in City Center",
    favourite: false,
    description:
      "Spacious and modern apartment located in the heart of the city. Close to amenities and public transportation.",
    images: [],
    operation: "rent",
    date_of_creation: "2024-07-07",
    rooms: "2",
    price: "1000",
    bathrooms: "1",
    visits: {
      dates: ["2024-07-10", "2024-07-15", "2024-07-22"],
    },
    amenities: {
      parking: false,
      ac: false,
      furnished: false,
      pool: false,
      microwave: false,
      near_subway: false,
      beach_view: false,
      alarm: false,
      garden: false,
    },
    contact_info: "contact@example.com",
    status: "pending",
    notification: "",
    iduser: "1",
  });

  const amenityIcons: { [key: string]: string } = {
    parking: 'car',
    ac: 'snowflake-o',
    furnished: 'bed',
    pool: 'tint',
    microwave: 'cutlery',
    near_subway: 'subway',
    beach_view: 'umbrella',
    alarm: 'bell',
    garden: 'tree',
  };

  const handleImageSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          upload_preset: CLOUDINARY_PRESET,
        },
      });

      if (response.data && response.data.secure_url) {
        setPropertyData((prevData) => ({
          ...prevData,
          images: [...prevData.images, response.data.secure_url],
        }));
      } else {
        console.error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/addhouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Property posted successfully:", result);
        setPropertyData({
          _id: "",
          address: "",
          size: "",
          category: "apartment",
          title: "",
          favourite: false,
          description: "",
          images: [],
          operation: "rent",
          date_of_creation: "",
          rooms: "",
          price: "",
          bathrooms: "",
          visits: {
            dates: [],
          },
          amenities: {
            parking: false,
            ac: false,
            furnished: false,
            pool: false,
            microwave: false,
            near_subway: false,
            beach_view: false,
            alarm: false,
            garden: false,
          },
          contact_info: "",
          status: "pending",
          notification: "",
          iduser: "",
        });
      } else {
        console.error("Failed to post property:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting property:", error);
    }
  };

  const handleInputChange = (
    name: keyof PropertyData,
    value: string | boolean
  ) => {
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleCheckbox = (name: keyof typeof propertyData.amenities) => {
    setPropertyData((prevData) => ({
      ...prevData,
      amenities: {
        ...prevData.amenities,
        [name]: !prevData.amenities[name],
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Post Your Property</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.address}
          onChangeText={(text) => handleInputChange("address", text)}
          placeholder="Enter address"
        />

        <Text style={styles.label}>Size (sqm):</Text>
        <TextInput
          style={styles.input}
          value={propertyData.size}
          onChangeText={(text) => handleInputChange("size", text)}
          placeholder="Enter size"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category:</Text>
        <Picker
          style={styles.input}
          selectedValue={propertyData.category}
          onValueChange={(itemValue) =>
            handleInputChange("category", itemValue)
          }
        >
          <Picker.Item label="Apartment" value="apartment" />
          <Picker.Item label="House" value="house" />
          <Picker.Item label="Office" value="office" />
          <Picker.Item label="Studio" value="studio" />
          <Picker.Item label="Penthouse" value="penthouse" />
        </Picker>

        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.title}
          onChangeText={(text) => handleInputChange("title", text)}
          placeholder="Enter title"
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={propertyData.description}
          onChangeText={(text) => handleInputChange("description", text)}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.price}
          onChangeText={(text) => handleInputChange("price", text)}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Rooms:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.rooms}
          onChangeText={(text) => handleInputChange("rooms", text)}
          placeholder="Enter number of rooms"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Bathrooms:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.bathrooms}
          onChangeText={(text) => handleInputChange("bathrooms", text)}
          placeholder="Enter number of bathrooms"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Contact Info:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.contact_info}
          onChangeText={(text) => handleInputChange("contact_info", text)}
          placeholder="Enter contact info"
        />

        <Text style={styles.amenitiesTitle}>Amenities:</Text>
        <View style={styles.amenitiesContainer}>
          {Object.keys(propertyData.amenities).map((key) => (
            <View key={key} style={styles.amenityCheckbox}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleCheckbox(key as keyof typeof propertyData.amenities)}
              >
                {propertyData.amenities[key as keyof typeof propertyData.amenities] && (
                  <View style={styles.checkboxInner} />
                )}
              </TouchableOpacity>
              <Icon name={amenityIcons[key]} size={20} color="#007bff" style={styles.amenityIcon} />
              <Text style={styles.amenityLabel}>{key.replace(/_/g, ' ')}</Text>
            </View>
          ))}
        </View>
        
        <Text>Select Images</Text>
       
          <input
            type="file"
            onChange={handleImageSelection}
            accept="image/*"
            multiple
          />
      

        <View style={styles.selectedImagesContainer}>
          {propertyData.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.selectedImage}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  amenitiesContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "space-between"
  },
  amenityCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 20,

  },
  amenityIcon: {
    marginRight: 10,
    color: "#007bff",
  },
  amenityLabel: {
    color: "#333",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 14,
    height: 14,
    backgroundColor: "#007bff",
    borderRadius: 2,
  },

  imageButton: {
    borderWidth: 1,
    flexDirection: "column",
    borderColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,

  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});


export default PostProperty;