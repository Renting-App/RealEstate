import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import debounce from "lodash.debounce";

interface Place {
  id: string;
  title: string;
  description: string;
  map: {
    latitude: number;
    longitude: number;
  };
}

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const MAPBOX_GEOCODING_URL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW9oYW1lZGFsaTgwNTYiLCJhIjoiY2x6Mjd6azc3Mm5jZDJscXZkN2U3djlxcCJ9.YV7MiFQVFazJi7w4iY_JDw";

const Maps: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://192.168.1.105:5800/houses");
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
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
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

  const handleMarkerPress = (place: Place) => {
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

  const fetchSuggestions = async (text: string) => {
    if (text.length > 2) {
      try {
        setSuggestionsLoading(true);
        const response = await axios.get(
          `${MAPBOX_GEOCODING_URL}/${encodeURIComponent(text)}.json`,
          {
            params: {
              access_token: MAPBOX_ACCESS_TOKEN,
              autocomplete: true,
            },
          }
        );
        setSuggestions(response.data.features);
        setSuggestionsLoading(false);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setSuggestionsLoading(false);
        Alert.alert(
          "Error",
          "Error fetching suggestions. Please check your Mapbox access token."
        );
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  const handleQueryChange = (text: string) => {
    setSearchQuery(text);
    debouncedFetchSuggestions(text);
  };

  const handleSuggestionSelect = (suggestion: any) => {
    const { center, place_name } = suggestion;
    setSearchQuery(place_name);
    setSuggestions([]);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: center[1],
          longitude: center[0],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleQueryChange}
          placeholder="Search for places"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Ionicons name="close-circle" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
      {suggestionsLoading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
            <Text style={styles.suggestionItem}>{item.place_name}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsList}
        ListEmptyComponent={
          !suggestionsLoading && searchQuery.length > 2 ? (
            <Text style={styles.noResultsText}>No results found</Text>
          ) : null
        }
      />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 33.8869,
          longitude: 9.5375,
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
        {places.map((place) => (
          <Marker
            key={place.id}
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
  searchContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  suggestionsList: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noResultsText: {
    padding: 10,
    textAlign: "center",
    color: "#ccc",
  },
  loadingIndicator: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    zIndex: 1,
  },
});

export default Maps;
