import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

type RequestTourScreenRouteProp = RouteProp<RootStackParamList, "RequestTour">;

interface ResidenceData {
  title: string;
  visits: string[];
}

const RequestTour: React.FC = () => {
  const route = useRoute<RequestTourScreenRouteProp>();
  const { residence } = route.params;
  const [residenceData, setResidenceData] = useState<ResidenceData | null>(null);
  const [selectedVisitDate, setSelectedVisitDate] = useState<string>("");

  useEffect(() => {
    console.log("Raw residence parameter:", residence);
    if (residence) {
      try {
        const parsedResidence = JSON.parse(residence) as ResidenceData;
        console.log("Parsed residence:", parsedResidence);
        setResidenceData(parsedResidence);
      } catch (error) {
        console.error("Error parsing residence data:", error);
      }
    }
  }, [residence]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.1.13:5800/addreq', {
        name,
        email,
        phone,
        message,
        selectedVisitDate,
        residence: residenceData,
      });
      console.log('Tour request created:', response.data);
      
      Alert.alert(
        "Request Submitted",
        "Your tour request has been sent successfully.",
        [{ text: "OK" }]
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        console.error('Axios Error Details:', error.response?.data);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  if (!residenceData) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.header}>
          Request a Tour for {residenceData.title}
        </Text>
      </View>

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
          <Text style={styles.instructionsText}>
            Please select a date from the options below:
          </Text>
          <View style={styles.pickerContainer}>
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
        </View>
      ) : (
        <Text style={styles.noDatesText}>No available visit dates.</Text>
      )}

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  titleContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  datesContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  datesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  instructionsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  noDatesText: {
    fontSize: 16,
    color: "red",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#666",
  },
});

export default RequestTour;
