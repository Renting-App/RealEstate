import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  View,
} from "react-native";
import PropertyForm from "./PropertyForm";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./_layout";
import { locations } from "./FilterComponent";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

type UpdatePropertyFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UpdatePropertyForm"
>;
type UpdatePropertyFormRouteProp = RouteProp<
  RootStackParamList,
  "UpdatePropertyForm"
>;

type Props = {
  navigation: UpdatePropertyFormNavigationProp;
  route: UpdatePropertyFormRouteProp;
};

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1sxdmac/upload";
const CLOUDINARY_PRESET = "hotel_preset";

const getCurrentDate = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
};

const initializePropertyData = (property: PropertyData): PropertyData => {
  const defaultLocation = Object.keys(locations)[0];
  const defaultSubLocation = locations[defaultLocation][0];

  return {
    idhouses: property._id || "", // Updated to use `_id` from property
    address: property.address || "",
    size: property.size || 0,
    category: property.category || "apartment",
    title: property.title || "",
    favourite: property.favourite || false,
    description: property.description || "",
    images: property.images || [],
    operation: property.operation || "rent",
    location: property.location || defaultLocation,
    subLocation: property.subLocation || defaultSubLocation,
    date_of_creation: property.date_of_creation || getCurrentDate(),
    rooms: property.rooms || 0,
    price: property.price || 0,
    bathrooms: property.bathrooms || 0,
    visits: property.visits || [],
    amenities: {
      parking: property.amenities?.parking || false,
      ac: property.amenities?.ac || false,
      furnished: property.amenities?.furnished || false,
      pool: property.amenities?.pool || false,
      microwave: property.amenities?.microwave || false,
      near_subway: property.amenities?.near_subway || false,
      beach_view: property.amenities?.beach_view || false,
      alarm: property.amenities?.alarm || false,
      garden: property.amenities?.garden || false,
    },
    contact_info: property.contact_info || "",
    status: property.status || "pending",
    notification: property.notification || "",
    iduser: property.iduser?._id || "", // Ensure iduser is correctly populated
    condition: property.condition || "new",
    map: property.map || { latitude: 0, longitude: 0 },
  };
};

const UpdatePropertyForm: React.FC<Props> = ({ route, navigation }) => {
  const { property, onUpdate } = route.params;
  const [propertyData, setPropertyData] = useState(
    initializePropertyData(property)
  );
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    navigation.setParams({ onUpdate: undefined }); // Remove non-serializable params
  }, []);

  const handleInputChange = (
    name: keyof PropertyData,
    value: string | boolean
  ) => {
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleCheckbox = (name: keyof PropertyData["amenities"]) => {
    setPropertyData((prevData) => ({
      ...prevData,
      amenities: {
        ...prevData.amenities,
        [name]: !prevData.amenities[name],
      },
    }));
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
      aspect: [9, 12],
      quality: 1,
    };

    Alert.alert(
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPropertyData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleDayPress = (day: DateObject) => {
    const date = day.dateString;
    const isSelected = propertyData.visits.includes(date);

    if (isSelected) {
      setPropertyData((prevData) => ({
        ...prevData,
        visits: prevData.visits.filter((d) => d !== date),
      }));
    } else {
      setPropertyData((prevData) => ({
        ...prevData,
        visits: [...prevData.visits, date],
      }));
    }
  };

  const getMarkedDates = () => {
    const markedDates: { [date: string]: { selected: boolean } } = {};
    propertyData.visits.forEach((date) => {
      markedDates[date] = { selected: true };
    });
    return markedDates;
  };

  const handleSubmit = async () => {
    try {
      if (!propertyData.idhouses) {
        throw new Error("Property ID is missing.");
      }

      console.log("Submitting Property Data:", propertyData);

      const { iduser, ...dataToUpdate } = propertyData; // Exclude iduser if it's empty

      const response = await fetch(
        `http://192.168.1.13:5800/houses/${propertyData.idhouses}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate),
        }
      );

      const text = await response.text(); // Get response text
      if (!response.ok) {
        console.error("Server response not OK:", text);
        throw new Error(text);
      }

      const result = JSON.parse(text); // Parse the response text as JSON
      console.log("Property updated successfully:", result);
      setPropertyData(result);
      if (onUpdate) {
        onUpdate(result);
      }

      Alert.alert("Success", "Property updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating property:", error);
      Alert.alert(
        "Error",
        (error as Error).message ||
          "An error occurred while updating the property."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyForm
        propertyData={propertyData}
        handleInputChange={handleInputChange}
        toggleCheckbox={toggleCheckbox}
        handleImageSelection={handleImageSelection}
        getMarkedDates={getMarkedDates}
        handleDayPress={handleDayPress}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />
      <TouchableOpacity onPress={handleImageSelection}>
        <Text style={styles.imageButton}>Upload Images</Text>
      </TouchableOpacity>

      {propertyData.images.length > 0 && (
        <View style={styles.imageContainer}>
          {propertyData.images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveImage(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update Property" onPress={handleSubmit} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  imageButton: {
    color: "#007bff",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UpdatePropertyForm;
