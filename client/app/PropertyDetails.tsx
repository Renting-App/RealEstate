import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeButton } from './HomeButton';
import { Link } from 'expo-router';


interface Property {
  _id: number;
  address: string;
  images: string[];
  price: number;
  description: string;
  contact_info: string;
}

const PropertyDetails = () => {
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

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    marginBottom: 16,
    textAlign: 'center',
  },
  imageWrapper: {
    width: screenWidth,
    height: 300,
    marginBottom: 16,
  },
  imageContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth * 0.9,
    height: screenHeight,
    borderRadius: 10,
    margin: 4,
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  contact: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
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
});

export default PropertyDetails;
