import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types";
import { Picker } from "@react-native-picker/picker";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../config/firebase";

type RequestTourScreenRouteProp = RouteProp<RootStackParamList, "RequestTour">;

interface ResidenceData {
  _id: string;
  address: string;
  size: number;
  category: string;
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: string;
  location: string;
  subLocation: string;
  date_of_creation: string;
  rooms: number;
  price: number;
  bathrooms: number;
  visits: string[];
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
  contact_info: string;
  status: string;
  notification: string;
  iduser: string;
  condition: string;
  map: {
    latitude: number;
    longitude: number;
  };
  __v: number;
}

const RequestTour: React.FC = () => {
  const route = useRoute<RequestTourScreenRouteProp>();
  const { residence } = route.params;
  const [residenceData, setResidenceData] = useState<ResidenceData | null>(
    null
  );
  const [selectedVisitDate, setSelectedVisitDate] = useState<string>("");

  useEffect(() => {
    if (residence) {
      try {
        const parsedResidence = JSON.parse(residence) as ResidenceData;
        console.log("Parsed residence data:", parsedResidence);
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

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.username);
          setEmail(userData.email);
          setPhone(userData.phone_number);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser && residenceData) {
        const ownerDocRef = doc(firestore, "users", residenceData.iduser);
        await updateDoc(ownerDocRef, {
          requests: arrayUnion({
            type: "tourRequest",
            userId: currentUser.uid,
            username: name,
            email,
            phone_number: phone,
            residenceTitle: residenceData.title,
            selectedVisitDate,
            message,
          }),
        });

        Alert.alert(
          "Request Submitted",
          "Your tour request has been sent successfully.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error("Error submitting request:", error);
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
        <View style={styles.pickerContainer}>
          <Text style={styles.datesTitle}>Available Visit Dates:</Text>
          <Text style={styles.instructionsText}>
            Please select a date from the options below:
          </Text>
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
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
    marginTop: 20,
    paddingTop: 12,
  },
  pickerContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
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
  picker: {
    height: 50,
    width: "100%",
  },
  noDatesText: {
    fontSize: 16,
    color: "red",
  },
  button: {
    backgroundColor: "#000080",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
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