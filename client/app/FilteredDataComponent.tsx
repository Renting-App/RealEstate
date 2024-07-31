import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "@/assets/IPaddress";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';

type NavigationProp = StackNavigationProp<RootStackParamList, 'PropertyDetails'>;

type FilteredDataComponentProps = {
  route: RouteProp<RootStackParamList, "FilteredDataComponent">;
};

export type Residence = {
  _id: number;
  title: string;
  address: string;
  size: number;
  price: string;
  rooms: number;
  bathrooms: number;
  description: string;
  contact_info: string;
  images: string[];
  operation: string;
  category: string;
  location: string;
  subLocation: string;
  amenities: {
    [key: string]: boolean; // Allow dynamic property access
  };
};

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
          _id: residence._id,
          title: residence.title ?? "",
          address: residence.address ?? "",
          size: residence.size ?? "",
          price: residence.price ?? "",
          rooms: residence.rooms ?? "",
          bathrooms: residence.bathrooms ?? "",
          description: residence.description ?? "",
          contact_info: residence.contact_info ?? "",
          images: residence.images ?? [],
          operation: residence.operation ?? "",
          category: residence.category ?? "",
          location: residence.location ?? "",
          subLocation: residence.subLocation ?? "",
          amenities: residence.amenities ?? {
            ac: false,
            pool: false,
            alarm: false,
            garden: false,
            parking: false,
            furnished: false,
            microwave: false,
            beach_view: false,
            near_subway: false,
          },
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
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList
        data={filteredResidences}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.address}</Text>
              <Text>{item.description}</Text>
              <Text>Price: {item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FilteredDataComponent;
