import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HomeButton } from './HomeButton';

const FAQ: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <HomeButton />
      
      <Text style={styles.title}>Frequently Asked Questions</Text>

      <View style={styles.faqItem}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>What is Rent&Sale?</Text>
        </View>
        <Text style={styles.answer}>
          Rent&Sale is a platform that connects renters and buyers with property owners. Clients can find apartments and houses to rent or buy, and property owners can post their properties for rent or sale.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>How do I search for properties?</Text>
        </View>
        <Text style={styles.answer}>
          You can search for properties using our user-friendly search feature. Filter results based on location, price, property type, and other criteria to find your perfect home.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>How do I list my property?</Text>
        </View>
        <Text style={styles.answer}>
          To list your property, sign up for an account and navigate to the "Post a Property" section. Fill in the necessary details, upload images, and submit your listing for review.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>Is there a fee to use Rent&Sale?</Text>
        </View>
        <Text style={styles.answer}>
          Browsing and searching for properties is free. Listing a property may incur a fee based on the listing package you choose. Refer to our pricing page for more details.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>How do I contact property owners?</Text>
        </View>
        <Text style={styles.answer}>
          Once you find a property you are interested in, use the "Contact Owner" feature on the property page to send a message or request a tour.
        </Text>
      </View>

      <View style={styles.faqItem}>
        <View style={styles.questionBox}>
          <Text style={styles.question}>How do I schedule a property tour?</Text>
        </View>
        <Text style={styles.answer}>
          To schedule a tour, click on the "Request a Tour" button on the property page. Select a convenient date and time, and the property owner will confirm your request.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  homeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    marginRight: 50,
    zIndex: 1, // Ensure it stays on top of other elements
  },
  title: {
    marginLeft: 39,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 20,
  },
  questionBox: {
    
    borderRadius: 10,
    borderColor:'#FFA500',
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default FAQ;
