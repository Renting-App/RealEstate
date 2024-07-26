import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
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
  const mapRef = useRef<MapView>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [propertyData, setPropertyData] = useState({
    address: "",
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
    iduser: "",
    map: { latitude: 33.8869, longitude: 9.5375 },
  });

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
    const adminFee = propertyData.price * 0.1;
    Alert.alert(
      "Confirmation",
      `Are you sure you want to post this property? The admin fee is $${adminFee}.`,
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
                "http://192.168.1.22:5800/addhouse",
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
                setPropertyData({
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
                });
              } else {
                const error = await response.json();
                console.error("Error posting property:", error);
                Alert.alert(
                  "Error",
                  `Error posting property: ${error.message}`
                );
              }
            } catch (error) {
              console.error("Error posting property:", error);
              Alert.alert("Error", `Error posting property: ${error.message}`);
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
          address: address,
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
          address: address,
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
      <FlatList
        ListHeaderComponent={
          <>
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
              <TextInput
                style={styles.input}
                value={propertyData.address}
                onChangeText={handleQueryChange}
                placeholder="Enter address"
              />
            </View>
          </>
        }
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
            <Text style={styles.itemText}>{item.place_name}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <>
            {propertyData.images.length > 0 && (
              <View style={styles.imageContainer}>
                {propertyData.images.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.image}
                  />
                ))}{" "}
                <TouchableOpacity onPress={handleImageSelection}>
                  <Text style={styles.imageButton}>Upload Images</Text>
                </TouchableOpacity>
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
          </>
        }
      />
    </View>
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default PostProperty;
