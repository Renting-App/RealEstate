import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface ResidenceData {
  address: string;
  images: string[];
  price: number;
  description: string;
  contact_info: string;
}

const PropertyDetails = () => {
  const { residence } = useLocalSearchParams();
  const residenceData: ResidenceData = JSON.parse(residence as string);

  const handleContactSeller = () => {
    console.log(`Contacting seller: ${residenceData.contact_info}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{residenceData.address}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
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
      <Text style={styles.price}>Price: ${residenceData.price}</Text>
      <Text style={styles.description}>{residenceData.description}</Text>
      <Text style={styles.contact}>Contact: {residenceData.contact_info}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Contact Seller"
          onPress={handleContactSeller}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  imageContainer: {
    height: 300,
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
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
    marginBottom: 200,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 90,
    alignItems: 'center',
  },
});

export default PropertyDetails;
