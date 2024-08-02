import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { RootStackParamList } from "../constants/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFavorites } from "./FavoritesContext";

export interface Property {
  _id: string;
  address: string;
  size: string;
  category: "apartment" | "house" | "office" | "studio" | "penthouse";
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: "rent" | "sale";
  price: string;
  date_of_creation: string;
  rooms: string;
  bathrooms: string;
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
  map?: {
    title: string;
    description: string;
    latitude: number;
    longitude: number;
  };
}

type PropertyDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "PropertyDetails"
>;
type PropertyDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PropertyDetails"
>;

const PropertyDetails: React.FC = () => {
  const route = useRoute<PropertyDetailsScreenRouteProp>();
  const navigation = useNavigation<PropertyDetailsNavigationProp>();
  const { residence } = route.params;
  const { addToFavorites, removeFromFavorites } = useFavorites();
  const [residenceData, setResidenceData] = useState<Property | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (residence) {
      try {
        const parsedResidence = JSON.parse(residence);
        setResidenceData(parsedResidence);
        setIsFavourite(parsedResidence.favourite);
      } catch (error) {
        console.error("Error parsing residence data:", error);
      }
    } else {
      console.error("Residence data is undefined");
    }
  }, [residence]);

  const toggleFavourite = () => {
    if (residenceData) {
      const newFavouriteStatus = !isFavourite;
      setIsFavourite(newFavouriteStatus);
      if (newFavouriteStatus) {
        addToFavorites(residenceData);
      } else {
        removeFromFavorites(residenceData._id);
      }
    }
  };

  if (!residenceData) {
    return <Text>Loading...</Text>;
  }

  const adminFee = (parseFloat(residenceData.price) * 0.1).toFixed(2);

  const amenityIcons: { [key in keyof Property["amenities"]]: string } = {
    parking: "car",
    ac: "snowflake",
    furnished: "bed",
    pool: "pool",
    microwave: "microwave",
    near_subway: "train",
    beach_view: "beach",
    alarm: "alert",
    garden: "flower",
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{residenceData.title}</Text>
        <Text style={styles.price}>{residenceData.price} DT</Text>
        <Text style={styles.adminFee}>Admin Fee: {adminFee} DT</Text>
        <TouchableOpacity
          onPress={toggleFavourite}
          style={styles.favouriteButton}
        >
          <Ionicons
            name={isFavourite ? "heart" : "heart-outline"}
            size={24}
            color="#ff0000"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageContainer}
        >
          {residenceData.images &&
            residenceData.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
              />
            ))}
        </ScrollView>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="resize" size={24} color="#ffffff" />
          <Text style={styles.detailText}>{residenceData.size} m²</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="bed" size={24} color="#ffffff" />
          <Text style={styles.detailText}>{residenceData.rooms} Rooms</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="toilet" size={24} color="#ffffff" />
          <Text style={styles.detailText}>
            {residenceData.bathrooms} Bathrooms
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{residenceData.description}</Text>
      <Text style={styles.address}>Address: {residenceData.address}</Text>

      <View style={styles.amenities}>
        <Text style={styles.amenitiesTitle}>Amenities</Text>
        <View style={styles.amenitiesList}>
          {residenceData.amenities &&
            Object.keys(residenceData.amenities).map((key) => (
              <View key={key} style={styles.amenity}>
                <Ionicons
                  name={
                    residenceData.amenities[key as keyof Property["amenities"]]
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={24}
                  color={
                    residenceData.amenities[key as keyof Property["amenities"]]
                      ? "#4CAF50"
                      : "#ccc"
                  }
                />
                <MaterialCommunityIcons
                  name={amenityIcons[key as keyof Property["amenities"]]}
                  size={24}
                  color="#666"
                  style={styles.amenityIcon}
                />
                <Text style={styles.amenityText}>{key.replace("_", " ")}</Text>
              </View>
            ))}
        </View>
      </View>

      {residenceData.map?.latitude && residenceData.map?.longitude && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: residenceData.map.latitude,
              longitude: residenceData.map.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: residenceData.map.latitude,
                longitude: residenceData.map.longitude,
              }}
              title={residenceData.map.title}
              description={residenceData.map.description}
            />
          </MapView>
        </View>
      )}

      <Button
        title="Request a Tour"
        onPress={() => {
          navigation.navigate("RequestTour", {
            residence: JSON.stringify(residenceData),
          });
        }}
        color="#00796B" 
      />
    </ScrollView>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF", 
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004D40",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796B",
  },
  adminFee: {
    fontSize: 16,
    color: "#FF5722",
    marginTop: 5,
  },
  favouriteButton: {
    marginTop: 10,
  },
  imageWrapper: {
    height: screenHeight * 0.4,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
    width: screenWidth - 70,
    height: screenHeight * 0.4,
    margin: 2,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00796B",
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#ffffff", 
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: "#004D40", 
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#004D40", 
    marginBottom: 20,
  },
  amenities: {
    marginBottom: 20,
  },
  amenitiesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004D40", 
    marginBottom: 10,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenity: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 10,
  },
  amenityIcon: {
    marginLeft: 8,
  },
  amenityText: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 5,
    textTransform: "capitalize",
  },
  mapContainer: {
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PropertyDetails;
