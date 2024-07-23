import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { DateObject } from "react-native-calendars";
import PropertyForm from "./PropertyForm";
import MapView, { Marker } from "react-native-maps";
import { RootStackParamList } from "./_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1sxdmac/upload";
const CLOUDINARY_PRESET = "hotel_preset";

interface PropertyData {
  address: string;
  size: number;
  category: "apartment" | "house" | "office" | "studio" | "penthouse";
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: "rent" | "sale";
  map: { latitude: number; longitude: number };
  date_of_creation: string;
  rooms: number;
  price: number;
  bathrooms: number;
  visits: string[];
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
  iduser?: string;
  condition: "new" | "occasion";
  location: string;
  subLocation: string;
}

const getCurrentDate = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
};

type PostPropertyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PostProperty"
>;

type Props = {
  navigation: PostPropertyScreenNavigationProp;
};

const PostProperty: React.FC<Props> = ({ navigation }) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const mapRef = useRef<MapView>(null);

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
      visits: isSelected
        ? prevData.visits.filter((d) => d !== date)
        : [...prevData.visits, date],
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
    address: "123 Main Street, Cityville, State",
    size: 120,
    category: "apartment",
    title: "Modern Apartment in City Center",
    favourite: false,
    description:
      "Spacious and modern apartment located in the heart of the city. Close to amenities and public transportation.",
    images: [],
    operation: "rent",
    condition: "new",
    location: "Ariana",
    subLocation: "Ariana Essoughra",
    date_of_creation: getCurrentDate(),
    rooms: 2,
    price: 1000,
    bathrooms: 1,
    visits: [],
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
    iduser: undefined, 
    map: { latitude: 33.8869, longitude: 9.5375 },
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

  const handleSubmit = async () => {
    try {
      setLoading(true); 
      const response = await fetch("http://192.168.1.13:5800/addhouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      setLoading(false); 

      if (response.ok) {
        const result = await response.json();
        console.log("Property posted successfully:", result);
        Alert.alert("Success", "Property posted successfully!");
        setPropertyData({
          address: "",
          size: 0,
          category: "apartment",
          title: "",
          favourite: false,
          description: "",
          images: [],
          operation: "rent",
          date_of_creation: getCurrentDate(),
          rooms: 0,
          price: 0,
          bathrooms: 0,
          visits: [],
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
          iduser: undefined, 
          map: { latitude: 0, longitude: 0 },
          condition: "new",
          location: "Ariana",
          subLocation: "Ariana Essoughra",
        });
        navigation.navigate("HousesScreen");
      } else {
        const errorText = await response.text();
        console.error("Failed to post property:", response.status, errorText);
        Alert.alert(
          "Error",
          `Failed to post property: ${response.status} ${errorText}`
        );
      }
    } catch (error) {
      setLoading(false); 
      console.error("Error posting property:", error);
      Alert.alert("Error", `Error posting property: ${error.message}`);
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

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMap({ latitude, longitude });
    setPropertyData((prevData) => ({
      ...prevData,
      map: { latitude, longitude },
    }));
  };

  const handleUseCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMap({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setPropertyData((prevData) => ({
      ...prevData,
      map: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    }));
    mapRef.current?.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
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
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.image}
                />
              ))}
            </View>
          )}

          <MapView
            ref={mapRef}
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
              latitude: 33.8869,
              longitude: 9.5375,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            {map && <Marker coordinate={map} title="Property Location" />}
          </MapView>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleUseCurrentLocation}
          >
            <Ionicons name="locate" size={24} color="#fff" />
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Post Property</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  calendarButton: {
    color: "#007bff",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
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
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  map: {
    height: 300,
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  currentLocationButton: {
    color: "#007bff",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  locationButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default PostProperty;
