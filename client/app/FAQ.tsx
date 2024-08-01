// FAQ.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQ: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>

      <View style={styles.faqItem}>
        <Text style={styles.question}>What is Rent&Sale?</Text>
        <Text style={styles.answer}>
          Rent&Sale is a platform that connects renters and buyers with property owners. Clients can find apartments and houses to rent or buy, and property owners can post their properties for rent or sale.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>How do I search for properties?</Text>
        <Text style={styles.answer}>
          You can search for properties using our user-friendly search feature. Filter results based on location, price, property type, and other criteria to find your perfect home.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>How do I list my property?</Text>
        <Text style={styles.answer}>
          To list your property, sign up for an account and navigate to the "Post a Property" section. Fill in the necessary details, upload images, and submit your listing for review.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>Is there a fee to use Rent&Sale?</Text>
        <Text style={styles.answer}>
          Browsing and searching for properties is free. Listing a property may incur a fee based on the listing package you choose. Refer to our pricing page for more details.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>How do I contact property owners?</Text>
        <Text style={styles.answer}>
          Once you find a property you are interested in, use the "Contact Owner" feature on the property page to send a message or request a tour.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <Text style={styles.question}>How do I schedule a property tour?</Text>
        <Text style={styles.answer}>
          To schedule a tour, click on the "Request a Tour" button on the property page. Select a convenient date and time, and the property owner will confirm your request.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004D40', // Dark green text
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#ffffff', // White background for each FAQ item
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0F2F1', // Light green border
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40', // Dark green text
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333', // Dark text for readability
  },
});

export default FAQ;
