import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout'; // Adjust the path as necessary

type FilteredDataComponentProps = {
  route: RouteProp<RootStackParamList, 'FilteredData'>;
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
    ac: boolean;
    pool: boolean;
    alarm: boolean;
    garden: boolean;
    parking: boolean;
    furnished: boolean;
    microwave: boolean;
    beach_view: boolean;
    near_subway: boolean;
  };
};

const FilteredDataComponent: React.FC<FilteredDataComponentProps> = ({ route }) => {
  const { criteria } = route.params;
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResidences();
  }, []);

  const fetchResidences = () => {
    fetch("http://192.168.1.13:5000/api/gethouse")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences: Residence[] = data.map((residence: any) => ({
          _id: residence.idhouses,
          title: residence.title,
          address: residence.address,
          size: residence.size,
          price: residence.price,
          rooms: residence.rooms,
          bathrooms: residence.bathrooms,
          description: residence.description,
          contact_info: residence.contact_info,
          images: residence.images,
          operation: residence.operation,
          category: residence.category,
          location: residence.location,
          subLocation: residence.subLocation,
          amenities: residence.amenities,
        }));
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
      return (
        (!criteria.category || residence.category === criteria.category) &&
        (!criteria.location || residence.location === criteria.location) &&
        (!criteria.subLocation || residence.subLocation === criteria.subLocation) &&
        (!criteria.operation || residence.operation === criteria.operation) &&
        (!criteria.priceMax  || parseFloat(residence.price) <= parseFloat(criteria.priceMax)) &&
        (!criteria.priceMin  || parseFloat(residence.price) >= parseFloat(criteria.priceMin))

      );
    });
    setFilteredResidences(filtered);
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
          <View style={styles.card}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.address}</Text>
            <Text>{item.description}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilteredDataComponent;