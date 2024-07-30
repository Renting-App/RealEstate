import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import PropertyForm from "./PropertyForm";
import * as ImagePicker from "expo-image-picker";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dw1sxdmac/upload";
const CLOUDINARY_PRESET = "hotel_preset";
const MAPBOX_GEOCODING_URL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW9oYW1lZGFsaTgwNTYiLCJhIjoiY2x6Mjd6azc3Mm5jZDJscXZkN2U3djlxcCJ9.YV7MiFQVFazJi7w4iY_JDw";

const getCurrentDate = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return currentDate;
};

const PostProperty = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const mapRef = useRef(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showMap, setShowMap] = useState(false);

  interface Property {
    address: string;
    size: number;
    category: string;
    title: string;
    favourite: boolean;
    description: string;
    images: string[];
    operation: string;
    condition: string;
    location: string;
    subLocation: string;
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
    status: string;
    notification: string;
    iduser: string;
    map: { latitude: number; longitude: number };
  }

  const initialPropertyData: Property = {
    address: "",
    size: 0,
    category: "apartment",
    title: "",
    favourite: false,
    description: "",
    images: [],
    operation: "rent",
    condition: "new",
    location: "Ariana",
    subLocation: "Ariana Essoughra",
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
    iduser: "",
    map: { latitude: 0, longitude: 0 },
  };

  const auth = getAuth();

  const fetchUserId = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(firestore, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setPropertyData((prevData) => ({
          ...prevData,
          iduser: currentUser.uid,
        }));
      }
    } else {
      console.log("No user is signed in!");
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  const [propertyData, setPropertyData] =
    useState<Property>(initialPropertyData);

  const handleDayPress = (day: any) => {
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

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3] as [number, number],
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
      const file = createImageFile(result.assets[0].uri);
      uploadToCloudinary(file);
    }
  };

  const createImageFile = (uri: string) => ({
    uri,
    type: "image/jpeg",
    name: `photo-${propertyData.images.length}.jpg`,
  });

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
      const errorMessage = (error as Error).message;
      console.error("Error uploading image:", errorMessage);
      Alert.alert("Error", `Error uploading image: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const adminFee = propertyData.price * 0.01;
    Alert.alert(
      "Confirmation",
      `Are you sure you want to post this property? The admin fee is ${adminFee} DT.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setLoading(true);
              const response = await fetch(
                "http://192.168.1.13:5800/addhouse",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(propertyData),
                }
              );

              setLoading(false);

              if (response.ok) {
                const result = await response.json();
                console.log("Property posted successfully:", result);
                Alert.alert("Success", "Property posted successfully!");
                setPropertyData(initialPropertyData);
              } else {
                const error = await response.json();
                console.error("Error posting property:", error);
                Alert.alert(
                  "Error",
                  `Error posting property: ${error.message}`
                );
              }
            } catch (error) {
              const errorMessage = (error as Error).message;
              console.error("Error posting property:", errorMessage);
              Alert.alert("Error", `Error posting property: ${errorMessage}`);
            }
          },
        },
      ]
    );
  };

  const handleInputChange = (
    name: keyof typeof propertyData,
    value: string | boolean
  ) => {
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleCheckbox = (name: keyof (typeof propertyData)["amenities"]) => {
    setPropertyData((prevData) => ({
      ...prevData,
      amenities: {
        ...prevData.amenities,
        [name]: !prevData.amenities[name],
      },
    }));
  };

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMap({ latitude, longitude });
    setPropertyData((prevData) => ({
      ...prevData,
      map: { latitude, longitude },
    }));

    try {
      const response = await axios.get(
        `${MAPBOX_GEOCODING_URL}/${longitude},${latitude}.json`,
        {
          params: {
            access_token: MAPBOX_ACCESS_TOKEN,
          },
        }
      );

      if (
        response.data &&
        response.data.features &&
        response.data.features.length > 0
      ) {
        const address = response.data.features[0].place_name;
        setPropertyData((prevData) => ({
          ...prevData,
          address: `${prevData.subLocation}, ${prevData.location}, ${address}`,
        }));
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
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

    try {
      const response = await axios.get(
        `${MAPBOX_GEOCODING_URL}/${location.coords.longitude},${location.coords.latitude}.json`,
        {
          params: {
            access_token: MAPBOX_ACCESS_TOKEN,
          },
        }
      );

      if (
        response.data &&
        response.data.features &&
        response.data.features.length > 0
      ) {
        const address = response.data.features[0].place_name;
        setPropertyData((prevData) => ({
          ...prevData,
          address: `${prevData.subLocation}, ${prevData.location}, ${address}`,
        }));
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  const handleQueryChange = async (text: string) => {
    setPropertyData((prevData) => ({
      ...prevData,
      address: text,
    }));
    if (text.length > 2) {
      try {
        const response = await axios.get(
          `${MAPBOX_GEOCODING_URL}/${encodeURIComponent(text)}.json`,
          {
            params: {
              access_token: MAPBOX_ACCESS_TOKEN,
              autocomplete: true,
            },
          }
        );
        const data = response.data;
        setSuggestions(data.features);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = async (suggestion: any) => {
    setPropertyData((prevData) => ({
      ...prevData,
      address: suggestion.place_name,
      map: {
        latitude: suggestion.center[1],
        longitude: suggestion.center[0],
      },
    }));
    setSuggestions([]);
    mapRef.current?.animateToRegion(
      {
        latitude: suggestion.center[1],
        longitude: suggestion.center[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      <PropertyForm
        propertyData={propertyData}
        handleInputChange={handleInputChange}
        toggleCheckbox={toggleCheckbox}
        handleImageSelection={handleImageSelection}
        getMarkedDates={getMarkedDates}
        handleDayPress={handleDayPress}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        handleQueryChange={handleQueryChange}
        handleSuggestionSelect={handleSuggestionSelect}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        handleSubmit={handleSubmit}
        handleMapPress={handleMapPress}
        handleUseCurrentLocation={handleUseCurrentLocation}
        map={map}
        mapRef={mapRef}
        loading={loading}
        showMap={showMap}
        setShowMap={setShowMap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostProperty;
