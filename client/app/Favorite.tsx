import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Residence {
  _id: number;
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
}

interface FavoriteProps {
  properties: Residence[];
}

const Favourite: React.FC<FavoriteProps> = ({ properties }) => {
  const [residences, setResidences] = useState<Residence[]>([]);
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);

  const fetchResidences = () => {
    fetch("http://192.168.1.105:5000/api/gethouse")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
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
          visits: residence.visits,
          operation: residence.operation,
          amenities: residence.amenities,
          location: residence.location,
          subLocation: residence.subLocation,
          condition: residence.condition,
          favourite: residence.favourite // Corrected capitalization
        }));
        setResidences(mappedResidences);
        setFilteredResidences(mappedResidences);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
      });
  };

  useEffect(() => {
    fetchResidences();
  }, []);

  const favoriteProperties = residences.filter(property => property.favourite);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {favoriteProperties.length > 0 ? (
        favoriteProperties.map((property) => (
          <View key={property._id} style={styles.propertyContainer}>
            <Text style={styles.title}>{property.title}</Text>
            <Text style={styles.price}>${property.price}</Text>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: property.images[0] }} style={styles.image} />
            </View>
            <Text>{property.description}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={24} color="#666" />
              <Text style={styles.address}>{property.address}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No favorite properties found.</Text>
      )}
    </ScrollView>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  propertyContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  imageWrapper: {
    height: screenWidth * 0.5,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  address: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
});

export default Favourite;
