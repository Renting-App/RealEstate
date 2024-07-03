import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons'; 

interface PropertyDetails {
  id: string;
  type: 'rent' | 'sale';
  title: string;
  images: string[]; 
  price: number; 
  description: string;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[]; 
  location: string; 
}

const mockProperty: PropertyDetails = {
  id: '1',
  type: 'rent',
  title: 'Cozy Apartment',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ],
  price: 1500,
  description: 'A cozy apartment in the heart of the city.',
  rooms: 3,
  bedrooms: 2,
  bathrooms: 1,
  amenities: ['alarm', 'internet', 'furnished', 'air conditioning', 'parking', 'terrace', 'dishwasher'],
  location: '123 Main St, Anytown',
};

const PropertyDetailsScreen = () => {
  const renderImages = () => {
    return (
      <ScrollView horizontal pagingEnabled>
        {mockProperty.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} resizeMode="cover" />
        ))}
      </ScrollView>
    );
  };

  const renderAmenities = () => {
    return (
      <View style={styles.amenitiesContainer}>
        {mockProperty.amenities.map((amenity, index) => (
          <View key={index} style={styles.amenityItem}>
            <FontAwesome name="check-circle" size={24} color="green" />
            <ThemedText style={styles.amenityText}>{amenity}</ThemedText>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {renderImages()}
      <View style={styles.detailsContainer}>
        <ThemedText type="title">{mockProperty.title}</ThemedText>
        <ThemedText type="default">Price: ${mockProperty.price} {mockProperty.type === 'rent' ? '/ month' : ''}</ThemedText>
        <ThemedText type="default">{mockProperty.description}</ThemedText>
        <View style={styles.roomsContainer}>
          <ThemedText type="default">Rooms: {mockProperty.rooms}</ThemedText>
          <ThemedText type="default">Bedrooms: {mockProperty.bedrooms}</ThemedText>
          <ThemedText type="default">Bathrooms: {mockProperty.bathrooms}</ThemedText>
        </View>
        <ThemedText type="title">Amenities</ThemedText>
        {renderAmenities()}
        <TouchableOpacity style={styles.requestButton} onPress={() => console.log('Request tour pressed')}>
          <ThemedText type="link">Request a Tour</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 300,
    height: 200,
  },
  detailsContainer: {
    padding: 16,
  },
  roomsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 8,
  },
  requestButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default PropertyDetailsScreen;