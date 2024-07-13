import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Picker } from "@react-native-picker/picker";
import {HomeButton} from './HomeButton'

interface ResidenceData {
  title: string;
  visits: string[];
}

const RequestTour: React.FC = () => {
  const { residence } = useLocalSearchParams();
  const [residenceData, setResidenceData] = useState<ResidenceData | null>(null);
  const [selectedVisitDate, setSelectedVisitDate] = useState<string>('');

  useEffect(() => {
    console.log('Raw residence parameter:', residence); 
    if (residence) {
      try {
        const parsedResidence = JSON.parse(residence as string) as ResidenceData;
        console.log('Parsed residence:', parsedResidence);
        setResidenceData(parsedResidence);
      } catch (error) {
        console.error('Error parsing residence data:', error);
      }
    }
  }, [residence]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log({
      name,
      email,
      phone,
      message,
      selectedVisitDate,
      residence: residenceData,
    });
  };

  if (!residenceData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeButton/>
      <Text style={styles.header}>Request a Tour for {residenceData.title}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      {residenceData.visits && residenceData.visits.length > 0 ? (
        <View style={styles.datesContainer}>
          <Text style={styles.datesTitle}>Available Visit Dates:</Text>
          <Picker
            selectedValue={selectedVisitDate}
            onValueChange={(itemValue) => setSelectedVisitDate(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a date" value="" />
            {residenceData.visits.map((date, index) => (
              <Picker.Item key={index} label={date} value={date} />
            ))}
          </Picker>
        </View>
      ) : (
        <Text style={styles.noDatesText}>No available visit dates.</Text>
      )}
  
      <View style={styles.buttonContainer}>
        <Button title="Submit Request" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  datesContainer: {
    marginTop: 16,
  },
  datesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  noDatesText: {
    fontSize: 16,
    color: 'red',
  },
  buttonContainer: {
    marginTop: 16,
  },
});

export default RequestTour;