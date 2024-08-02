import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { ThemedText } from "@/components/ThemedText";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from "@/assets/IPaddress";

type NavigationProp = StackNavigationProp<RootStackParamList, 'PropertyDetails'>;

type FilteredDataComponentProps = {
  route: RouteProp<RootStackParamList, "FilteredDataComponent">;
};

export type Residence = {
  _id: string;
  title: string;
  address: string;
  price: string;
  rooms: string;
  bathrooms: string;
  size: string;
  category: string;
  location: string;
  subLocation: string;
  description: string;
  contact_info: string;
  images: string[];
  operation: "rent" | "sale";
  visits: [];
  favourite: boolean;
  date_of_creation: string;
  amenities: any;
  status: string;
  notification: string;
  iduser: string;
  condition: string;
  map: {
    latitude: number;
    longitude: number;
  };
  __v: number;
}

const FilteredDataComponent: React.FC<FilteredDataComponentProps> = ({ route }) => {
  const { criteria } = route.params;
  const [residences, setResidences] = useState<Residence[]>([]);
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchResidences();
  }, []);

  const fetchResidences = () => {
    fetch(`${API_BASE_URL}/houses`)
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
          _id: residence._id ?? `id_${Date.now()}`,
          title: residence.title ?? "",
          address: residence.address ?? "",
          size: residence.size ?? 0,
          price: residence.price ?? 0,
          rooms: residence.rooms ?? 0,
          bathrooms: residence.bathrooms ?? 0,
          description: residence.description ?? "",
          contact_info: residence.contact_info ?? "",
          images: residence.images ?? [],
          operation: residence.operation ?? "",
          category: residence.category ?? "",
          location: residence.location ?? "",
          subLocation: residence.subLocation ?? "",
          visits: residence.visits ?? [],
          favourite: residence.favourite ?? false,
          date_of_creation: residence.date_of_creation ?? "",
          amenities: residence.amenities ?? {},
          status: residence.status ?? "",
          notification: residence.notification ?? "",
          iduser: residence.iduser ?? "",
          condition: residence.condition ?? "",
          map: residence.map ?? {},
        }));
        setResidences(mappedResidences);
        filterResidences(mappedResidences, criteria);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
        setLoading(false);
      });
  };

  const filterResidences = (residences: Residence[], criteria: any) => {
    const filtered = residences.filter((residence) => {
      const meetsCategory =
        !criteria.category || residence.category === criteria.category;
      const meetsLocation =
        !criteria.location || residence.location === criteria.location;
      const meetsSubLocation =
        !criteria.subLocation || residence.subLocation === criteria.subLocation;
      const meetsOperation =
        !criteria.operation || residence.operation === criteria.operation;
      const meetsPriceMax =
        !criteria.priceMax ||
        parseFloat(residence.price) <= parseFloat(criteria.priceMax);
      const meetsPriceMin =
        !criteria.priceMin ||
        parseFloat(residence.price) >= parseFloat(criteria.priceMin);

      const meetsAmenities = criteria.amenities.every((amenity: string) =>
        residence.amenities[amenity] === true
      );

      return (
        meetsCategory &&
        meetsLocation &&
        meetsSubLocation &&
        meetsOperation &&
        meetsPriceMax &&
        meetsPriceMin &&
        meetsAmenities
      );
    });
    setFilteredResidences(filtered);
  };

  const handlePress = (residence: Residence) => {
    navigation.navigate("PropertyDetails", {
      residence: JSON.stringify(residence),
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000080" />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredResidences}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={styles.card}>
            <View
              style={[
                styles.typeContainer,
                item.operation === "rent" ? styles.rent : styles.sale,
              ]}
            >
              <ThemedText type="subtitle" style={styles.typeText}>
                {item.operation === "rent" ? "Rent" : "Sale"}
              </ThemedText>
            </View>
            <Image
              source={{ uri: item.images[0] }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <ThemedText type="subtitle" style={styles.title}>
                  {item.title}
                </ThemedText>
                <ThemedText type="default" style={styles.price}>
                  {item.price} DT
                </ThemedText>
              </View>
              <ThemedText type="default" style={styles.address}>
                {item.address}
              </ThemedText>
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="resize" size={16} color="black" />
                  <ThemedText type="default" style={styles.detailText}>
                    {item.size} m²
                  </ThemedText>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="bed" size={16} color="black" />
                  <ThemedText type="default" style={styles.detailText}>
                    {item.rooms} Rooms
                  </ThemedText>
                </View>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="toilet" size={16} color="black" />
                  <ThemedText type="default" style={styles.detailText}>
                    {item.bathrooms} Bathrooms
                  </ThemedText>
                </View>
              </View> 
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  typeContainer: {
    padding: 5,
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  rent: {
    backgroundColor: "#ffcccc",
  },
  sale: {
    backgroundColor: "#ccffcc",
  },
  typeText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#666",
  },
  address: {
    fontSize: 14,
    marginVertical: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 5,
  },
});

export default FilteredDataComponent;
