import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { HomeButton } from "./HomeButton";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Maps = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://192.168.1.13:5800/houses");
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchPlaces();
      await getCurrentLocation();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleMarkerPress = (place) => {
    navigation.navigate("PropertyDetails", {
      residence: JSON.stringify(place),
    });
  };

  const zoomToCurrentLocation = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeButton />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 33.8869,
          longitude: currentLocation ? currentLocation.longitude : 9.5375,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
        )}
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.map.latitude,
              longitude: place.map.longitude,
            }}
            title={place.title}
            description={place.description}
            onPress={() => handleMarkerPress(place)}
          />
        ))}
      </MapView>
      <TouchableOpacity
        style={styles.locationButton}
        onPress={zoomToCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  locationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default Maps;
