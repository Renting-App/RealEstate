// AboutUs.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HomeButton } from './HomeButton';

const AboutUs: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <HomeButton />
        <Text style={styles.title}>About Rent&Sale</Text>
        <Text style={styles.description}>
          Rent&Sale is your premier destination for finding your next home or investment property.
          Whether you're looking to rent a cozy apartment or buy your dream house, we provide a
          seamless platform to connect renters and buyers with property owners across the globe.
        </Text>
        <Text style={styles.sectionTitle}>For Clients:</Text>
        <Text style={styles.description}>
          Discover a wide range of apartments and houses tailored to your needs. Our user-friendly
          interface allows you to easily search, filter, and compare properties based on location,
          price, and amenities. Find the perfect place to call home with Rent&Sale.
        </Text>
        <Text style={styles.sectionTitle}>For Property Owners:</Text>
        <Text style={styles.description}>
          Maximize your property's exposure by listing it on Rent&Sale. Whether you're renting out an
          apartment or selling a house, our platform offers robust features to showcase your property
          effectively. Manage inquiries, schedule tours, and close deals effortlessly.
        </Text>
        <Text style={styles.footer}>
          At Rent&Sale, we're committed to simplifying the real estate experience, making it easier
          for both clients and property owners to navigate the market with confidence.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
  },
  footer: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AboutUs;
