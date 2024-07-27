import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

interface User {
  username: string;
  email: string;
  phone_number: string;
  image: string;
  notification: any[];
}

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("Authenticated user ID: ", currentUser.uid);
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log("User document data: ", userDoc.data());
            setUser(userDoc.data() as User);
          }
        } else {
          console.log("No user is signed in!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setError(error as string);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Error loading user data
        </ThemedText>
      </View>
    );
  }

  const defaultImage = "https://via.placeholder.com/100?text=No+Image";

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        My Account
      </ThemedText>
      {user ? (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.image || defaultImage }}
            style={styles.profileImage}
          />
          <ThemedText type="subtitle" style={styles.profileText}>
            Name: {user.username}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.profileText}>
            Email: {user.email}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.profileText}>
            Phone: {user.phone_number}
          </ThemedText>
          <View style={styles.notificationIconContainer}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => router.push("/NotificationList")}
            >
              <Ionicons name="notifications" size={24} color="#fff" />
              {user.notification.length > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {user.notification.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ThemedText type="subtitle" style={styles.profileText}>
          No user data available
        </ThemedText>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/EditProfile")}
      >
        <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/MyProperties")}
      >
        <ThemedText style={styles.buttonText}>Manage My Properties</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => {
          auth.signOut().then(() => {
            router.push("/SignIn");
          });
        }}
      >
        <ThemedText style={styles.buttonText}>Log Out</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#343a40",
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#495057",
  },
  notificationIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
  },
  notificationBadgeText: {
    color: "#fff",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
});

export default MyAccount;
