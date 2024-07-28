import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../constants/types";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../config/firebase";

type NotificationDetailsRouteProp = RouteProp<
  RootStackParamList,
  "NotificationDetails"
>;

const NotificationDetails: React.FC = () => {
  const route = useRoute<NotificationDetailsRouteProp>();
  const navigation = useNavigation();
  const { notification } = route.params;
  const parsedNotification = JSON.parse(notification);

  const handleResponse = async (response: string) => {
    const message = `Your tour request for ${parsedNotification.residenceTitle} on ${parsedNotification.selectedVisitDate} has been ${response}.`;

    try {
      const userDocRef = doc(firestore, "users", parsedNotification.userId);
      await updateDoc(userDocRef, {
        notification: arrayUnion({
          type: "response",
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      const ownerDocRef = doc(firestore, "users", getAuth().currentUser.uid);
      await updateDoc(ownerDocRef, {
        requests: arrayRemove(parsedNotification),
      });

      Alert.alert(
        "Response Sent",
        `The user has been notified that the request was ${response}.`
      );
      console.log(`Response sent: ${response}`);
      navigation.goBack();
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  const handleDeleteNotification = async () => {
    try {
      const currentUser = getAuth().currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        if (parsedNotification.type === "request") {
          await updateDoc(userDocRef, {
            requests: arrayRemove(parsedNotification),
          });
          console.log("Request deleted from Firebase:", parsedNotification);
        } else {
          await updateDoc(userDocRef, {
            notification: arrayRemove(parsedNotification),
          });
          console.log(
            "Notification deleted from Firebase:",
            parsedNotification
          );
        }
        console.log("Notification deleted successfully:", parsedNotification);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <View style={styles.container}>
      {parsedNotification.type === "request" ? (
        <>
          <Text style={styles.header}>Tour Request Details</Text>
          <Text style={styles.detailText}>
            Username: {parsedNotification.username}
          </Text>
          <Text style={styles.detailText}>
            Email: {parsedNotification.email}
          </Text>
          <Text style={styles.detailText}>
            Phone Number: {parsedNotification.phone_number}
          </Text>
          <Text style={styles.detailText}>
            Residence: {parsedNotification.residenceTitle}
          </Text>
          <Text style={styles.detailText}>
            Requested Visit Date: {parsedNotification.selectedVisitDate}
          </Text>
          <Text style={styles.detailText}>
            Message: {parsedNotification.message}
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => handleResponse("approved")}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleResponse("rejected")}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteNotification}
          >
            <Text style={styles.buttonText}>Delete Notification</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.header}>Notification</Text>
          <Text style={styles.detailText}>{parsedNotification.message}</Text>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDeleteNotification}
          >
            <Text style={styles.buttonText}>Delete Notification</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  approveButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#f44336",
  },
  deleteButton: {
    backgroundColor: "#9E9E9E",
  },
});

export default NotificationDetails;
