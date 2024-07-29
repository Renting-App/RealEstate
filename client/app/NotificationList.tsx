import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const NotificationList: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log("Fetched requests:", userDoc.data().requests);
            console.log("Fetched notifications:", userDoc.data().notification);
            setRequests(userDoc.data().requests || []);
            setNotifications(userDoc.data().notification || []);
          } else {
            console.log("User document does not exist!");
          }
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [auth]);

  const handleDeleteNotification = async (notification, type) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        console.log(
          `Deleting notification: ${JSON.stringify(
            notification
          )}, Type: ${type}`
        );

        if (type === "request") {
          await updateDoc(userDocRef, {
            requests: arrayRemove(notification),
          });
          console.log("Request deleted from Firebase:", notification);
          setRequests((prevRequests) =>
            prevRequests.filter(
              (req) => req.timestamp !== notification.timestamp
            )
          );
        } else {
          await updateDoc(userDocRef, {
            notification: arrayRemove(notification),
          });
          console.log("Notification deleted from Firebase:", notification);
          setNotifications((prevNotifications) =>
            prevNotifications.filter(
              (notif) => notif.timestamp !== notification.timestamp
            )
          );
        }
        console.log("Notification deleted successfully:", notification);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleNotificationPress = (notification) => {
    console.log("Notification pressed:", notification);
    navigation.navigate("NotificationDetails", {
      notification: JSON.stringify(notification),
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const combinedNotifications = [
    ...requests.map((req) => ({ ...req, type: "request" })),
    ...notifications.map((notif) => ({ ...notif, type: "notification" })),
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={combinedNotifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <TouchableOpacity
              style={styles.notificationContent}
              onPress={() => handleNotificationPress(item)}
            >
              <Text style={styles.notificationText}>
                {item.type === "request"
                  ? `Tour Request: ${item.residenceTitle}`
                  : item.message}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNotification(item, item.type)}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noNotificationsText}>No notifications</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    padding: 10,
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NotificationList;
