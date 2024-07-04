import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PropertyDetails = () => {
  const { residence } = useLocalSearchParams();
  const residenceData = JSON.parse(residence as string);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{residenceData.address}</Text>
      <Image
        source={{ uri: residenceData.images[0] }}
        style={styles.image}
        resizeMode="center"
      />
      <Text style={styles.price}>Price: {residenceData.price}</Text>
      <Text style={styles.description}>{residenceData.description}</Text>
      <Text style={styles.contact}>Contact: {residenceData.contact_info}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  contact: {
    fontSize: 14,
    marginBottom: 16,
  },
});

export default PropertyDetails;
