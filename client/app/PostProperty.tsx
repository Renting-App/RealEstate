import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { Calendar, DateObject } from "react-native-calendars";
import { HomeButton } from "./HomeButton";
import PropertyForm from "./PropertyForm";
import Loader from "./Loader"; 
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1sxdmac/upload";
const CLOUDINARY_PRESET = "hotel_preset";

interface PropertyData {
  _id: string;
  address: string;
  size: number;
  category: "apartment" | "house" | "office" | "studio" | "penthouse";
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: "rent" | "sale";
  location: string;
  subLocation: string;
  date_of_creation: string;
  rooms: number;
  price: number;
  bathrooms: number;
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
  status: "pending" | "approved" | "declined";
  notification: string;
  iduser: string;
  condition: "new" | "occasion";
  map?: any;
}
const getCurrentDate = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
};
const PostProperty = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDayPress = (day: DateObject) => {
    const date = day.dateString;
    const isSelected = selectedDates.includes(date);

    if (isSelected) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }

    setPropertyData((prevData) => ({
      ...prevData,
      visits: {
        ...prevData.visits,
        dates: isSelected
          ? prevData.visits.dates.filter((d) => d !== date)
          : [...prevData.visits.dates, date],
      },
    }));
  };

  const getMarkedDates = () => {
    const markedDates: { [date: string]: { selected: boolean } } = {};
    selectedDates.forEach((date) => {
      markedDates[date] = { selected: true };
    });
    return markedDates;
  };
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
    date_of_creation: getCurrentDate(),
    rooms: "2",
    price: "1000",
    bathrooms: "1",
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
    contact_info: "contact@example.com",
    status: "pending",
    notification: "",
    iduser: "1",
  });

 

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

    const choice = Alert.alert(
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
    try {setLoading(true);
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

  const handleSubmit = async () => {
    try {
      const response = await fetch("http:///192.168.1.13:5000/api/addhouse", {
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

  return (
    <ScrollView style={styles.container}>
      <HomeButton />

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
      <Loader loading={loading} />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Property</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostProperty;
