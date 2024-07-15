import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { Calendar, DateObject } from "react-native-calendars";
import { HomeButton } from './HomeButton';

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
    parking: "car",
    ac: "snowflake-o",
    furnished: "bed",
    pool: "tint",
    microwave: "cutlery",
    near_subway: "subway",
    beach_view: "umbrella",
    alarm: "bell",
    garden: "tree",
  };

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const choice = await Alert.alert(
      "Select Image",
      "Would you like to take a photo or select from the library?",
      [
        { text: "Take Photo", onPress: () => launchCamera(options) },
        {
          text: "Select from Library",
          onPress: () => launchImageLibrary(options),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const launchCamera = async (options: ImagePicker.ImagePickerOptions) => {
    let result = await ImagePicker.launchCameraAsync(options);
    handleImageResult(result);
  };

  const launchImageLibrary = async (
    options: ImagePicker.ImagePickerOptions
  ) => {
    let result = await ImagePicker.launchImageLibraryAsync(options);
    handleImageResult(result);
  };

  const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      const file = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: `photo-${propertyData.images.length}.jpg`,
      };

      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      const response = await fetch("http:///192.168.1.105:5000/api/addhouse", {
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
            dates: selectedDates,
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
const handleDayPress = (day: DateObject) => {
  const date = day.dateString;
  const isSelected = selectedDates.includes(date);

  if (isSelected) {
    setSelectedDates(selectedDates.filter((d) => d !== date));
  } else {
    setSelectedDates([...selectedDates, date]);
  }
};

const getMarkedDates = () => {
  const markedDates: { [date: string]: { selected: boolean } } = {};
  selectedDates.forEach((date) => {
    markedDates[date] = { selected: true };
  });
  return markedDates;
};


  return (
    <ScrollView style={styles.container}>
      <HomeButton/>
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

        <Text style={styles.label}>Visit Dates:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.visits.dates.join(", ")}
          onChangeText={(text) =>
            handleInputChange("visits", {
              dates: text.split(",").map((date) => date.trim()),
            })
          }
          placeholder="Enter visit dates (comma separated)"
        />

        <Text style={styles.label}>Contact Info:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.contact_info}
          onChangeText={(text) => handleInputChange("contact_info", text)}
          placeholder="Enter contact info"
        />

        <Text style={styles.label}>Date of Creation:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.date_of_creation}
          onChangeText={(text) => handleInputChange("date_of_creation", text)}
          placeholder="Enter date of creation"
        />

        <Text style={styles.label}>Status:</Text>
        <TextInput
          style={styles.input}
          value={propertyData.status}
          onChangeText={(text) => handleInputChange("status", text)}
          placeholder="Enter status"
        />

        <Text style={styles.label}>Operation:</Text>
        <Picker
          style={styles.input}
          selectedValue={propertyData.operation}
          onValueChange={(itemValue) =>
            handleInputChange("operation", itemValue)
          }
        >
          <Picker.Item label="Rent" value="rent" />
          <Picker.Item label="Sell" value="sale" />
        </Picker>

        <Text style={styles.label}>Amenities:</Text>
        <View style={styles.amenitiesContainer}>
          {Object.keys(amenityIcons).map((amenity) => (
            <TouchableOpacity
              key={amenity}
              style={[
                styles.amenityButton,
                propertyData.amenities[
                  amenity as keyof typeof propertyData.amenities
                ]
                  ? styles.amenityButtonActive
                  : {},
              ]}
              onPress={() =>
                toggleCheckbox(amenity as keyof typeof propertyData.amenities)
              }
            >
              <Icon
                name={amenityIcons[amenity]}
                size={20}
                color={
                  propertyData.amenities[
                    amenity as keyof typeof propertyData.amenities
                  ]
                    ? "white"
                    : "black"
                }
              />
              <Text
                style={[
                  styles.amenityText,
                  propertyData.amenities[
                    amenity as keyof typeof propertyData.amenities
                  ]
                    ? styles.amenityTextActive
                    : {},
                ]}
              >
                {amenity}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={handleImageSelection}
        >
          <Text style={styles.imagePickerButtonText}>Select Images</Text>
        </TouchableOpacity>

        <View style={styles.imagePreviewContainer}>
          {propertyData.images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.imagePreview}
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
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amenityButton: {
    width: "48%",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  amenityButtonActive: {
    backgroundColor: "#007bff",
  },
  amenityText: {
    marginLeft: 8,
    color: "black",
  },
  amenityTextActive: {
    color: "white",
  },
  imagePickerButton: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePickerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
  },
  submitButton: {
    backgroundColor: "#28a745",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PostProperty;
