import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeButton } from './HomeButton';
import { Link } from 'expo-router';
import MapView, { Marker } from 'react-native-maps'; // Import MapView


interface Property {
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
  map?: {
    title: string;
    description: string;
    latitude: number;
    longitude: number;
  };
}


const PropertyDetails: React.FC = () => {
  const { residence } = useLocalSearchParams();
  const residenceData: Property = JSON.parse(residence as string);
  const [isFavourite, setIsFavourite] = useState(residenceData.favourite);
   
  if (!residenceData) {
    return <Text>Loading...</Text>;
  }

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    // Update the favourite status in your data source (e.g., backend or local storage)
  };

  const amenityIcons: { [key in keyof Property['amenities']]: string } = {
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
      <View style={styles.container}>
        <HomeButton />
        <View style={styles.header}>
          <Text style={styles.title}>{residenceData.title}</Text>
          <Text style={styles.price}>${residenceData.price}</Text>
          <TouchableOpacity onPress={toggleFavourite}>
            <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={24} color="#ff0000" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageContainer}
          >
            {residenceData.images.map((image, index) => (
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
            <Ionicons name="resize" size={24} color="white" />
            <Text style={styles.detailText}>{residenceData.size} m²</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="bed" size={24} color="white" />
            <Text style={styles.detailText}>{residenceData.rooms} Rooms</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={24} color="white" />
            <Text style={styles.detailText}>{residenceData.bathrooms} Bathrooms</Text>
          </View>
        </View>

        <Text style={styles.description}>{residenceData.description}</Text>
        <Text style={styles.address}>Address: {residenceData.address}</Text>

        <View style={styles.amenities}>
          <Text style={styles.amenitiesTitle}>Amenities</Text>
          <View style={styles.amenitiesList}>
            {Object.keys(residenceData.amenities).map((key) => (
              <View key={key} style={styles.amenity}>
                <Ionicons
                  name={residenceData.amenities[key as keyof Property['amenities']] ? "checkbox" : "square-outline"}
                  size={24}
                  color={residenceData.amenities[key as keyof Property['amenities']] ? "#4CAF50" : "#ccc"}
                />
                <MaterialCommunityIcons
                  name={amenityIcons[key as keyof Property['amenities']]}
                  size={24}
                  color="#666"
                  style={{ marginLeft: 8 }}
                />
                <Text style={styles.amenityText}>{key.replace('_', ' ')}</Text>
              </View>
            ))}
          </View>
        </View>

        {residenceData.map && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: residenceData.map.latitude,
                longitude: residenceData.map.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
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


        <Link
          href={{
            pathname: "/RequestTour",
            params: { residence: JSON.stringify(residenceData) },
          }}
          asChild
        >
          <Button title="Request a Tour" />
        </Link>
      </View>
    </ScrollView>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f7f7f7',
  },
  container: {
    padding: 14,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  imageWrapper: {
    height: screenHeight * 0.4,
    marginBottom: 20,
  },
  imageContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth * 0.9,
    height: screenHeight,
    borderRadius: 10,
    margin: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  address: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#666',
  },
  amenities: {
    marginBottom: 20,
  },
  amenitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  amenitiesList: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  mapContainer: {
    height: 300,
    marginVertical: 20,
 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PropertyDetails;
