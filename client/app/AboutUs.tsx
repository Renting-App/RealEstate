// AboutUs.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutUs: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Rent&Sale</Text>
      <View style={styles.box}>
        <Text style={styles.description}>
          Rent&Sale is your premier destination for finding your next home or investment property.
          Whether you're looking to rent a cozy apartment or buy your dream house, we provide a
          seamless platform to connect renters and buyers with property owners across the globe.
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>For Clients:</Text>
        <Text style={styles.description}>
          Discover a wide range of apartments and houses tailored to your needs. Our user-friendly
          interface allows you to easily search, filter, and compare properties based on location,
          price, and amenities. Find the perfect place to call home with Rent&Sale.
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>For Property Owners:</Text>
        <Text style={styles.description}>
          Maximize your property's exposure by listing it on Rent&Sale. Whether you're renting out an
          apartment or selling a house, our platform offers robust features to showcase your property
          effectively. Manage inquiries, schedule tours, and close deals effortlessly.
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.footer}>
          At Rent&Sale, we're committed to simplifying the real estate experience, making it easier
          for both clients and property owners to navigate the market with confidence.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000040', // Dark green text
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000080', // Dark green text
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333', // Dark text for readability
  },
  footer: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000080', // Light border
  },
});

export default AboutUs;
