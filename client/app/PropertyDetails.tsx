import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons

interface Property {
  _id: string;
  address: string;
  size: number;
  category: "apartment" | "house" | "office" | "studio" | "penthouse";
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: "rent" | "sale";
  price: number;
  date_of_creation: string;
  rooms: number;
  bathrooms: number;
  visits: {
    dates: string[]; // Array of ISO date strings
  };
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

const PropertyDetails: React.FC = () => {
  const { residence } = useLocalSearchParams();
  const residenceData: Property = JSON.parse(residence as string);

  if (!residenceData) {
    return <Text>Loading...</Text>; // Handle loading state or data retrieval issues
  }

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{residenceData.title}</Text>
        <Text style={styles.price}>${residenceData.price}</Text>
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
              resizeMode="cover"
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
        {residenceData.amenities && Object.keys(residenceData.amenities).map((key) => (
          <View key={key} style={styles.amenity}>
            <Ionicons
              name={residenceData.amenities[key as keyof Property['amenities']] ? "checkbox" : "square-outline"}
              size={24}
              color={residenceData.amenities[key as keyof Property['amenities']] ? "green" : "gray"}
            />
            <MaterialCommunityIcons
              name={amenityIcons[key as keyof Property['amenities']]}
              size={24}
              color="black"
              style={{ marginLeft: 8 }}
            />
            <Text style={styles.amenityText}>{key.replace('_', ' ')}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Request a Tour"
          onPress={() => {
            // Handle navigation to request tour screen
          }}
        />
      </View>
    </ScrollView>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black'
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  imageWrapper: {
    width: screenWidth,
    height: 300,
    marginBottom: 16,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: 300,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailText: {
    color: 'white',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  address: {
    fontSize: 16,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  amenities: {
    marginBottom: 16,
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PropertyDetails;
