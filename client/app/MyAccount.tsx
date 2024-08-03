import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import ReactNativeModal from "react-native-modal";

interface User {
  username: string;
  email: string;
  phone_number: string;
  image: string;
  notification: { id: string; message: string }[]; // Replace with a more specific type if available
}

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser(userDoc.data() as User);
          } else {
            setError("User document does not exist.");
          }
        } else {
          setError("No user is signed in!");
        }
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error fetching user data");
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
        <ThemedText type="title">
          Error loading user data: {error}
        </ThemedText>
      </View>
    );
  }

  const defaultImage = "https://via.placeholder.com/100?text=No+Image";
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.notificationIconContainer}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => router.push("/NotificationList")}
          >
            <Ionicons name="notifications" size={24} color="#fff" />
            {user?.notification && user.notification.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {user.notification.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user?.image || defaultImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <ThemedText type="subtitle" style={styles.profileName}>
              {user?.username || "Username"}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.profileEmail}>
              {user?.email || "Email"}
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Account Settings
        </ThemedText>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push("/EditProfile")}
        >
          <Ionicons name="person" size={20} color="#000080" />
          <ThemedText style={styles.sectionButtonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push("/MyProperties")}
        >
          <Ionicons name="home" size={20} color="#000080" />
          <ThemedText style={styles.sectionButtonText}>
            Manage My Properties
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          More Options
        </ThemedText>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="help-circle" size={20} color="#000080" />
          <ThemedText style={styles.sectionButtonText}>
            Contact Support
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sectionButton, styles.logoutButton]}
          onPress={() => {
            auth.signOut().then(() => {
              router.push("/SignIn");
            });
          }}
        >
          <Ionicons name="log-out" size={20} color="#dc3545" />
          <ThemedText style={styles.sectionButtonText}>Log Out</ThemedText>
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Image
            source={{
              uri: "https://gifdb.com/images/high/comedian-dave-chappelle-customer-service-meme-y6gmibfgz08fxsdy.webp",
            }}
            style={styles.modalImage}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    backgroundColor: "#000080", // Dark green background
    padding: 20,
    position: "relative",
    alignItems: "center",
  },
  notificationIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  notificationButton: {
    backgroundColor: "#000080", // Dark green background
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 2,
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  profileEmail: {
    fontSize: 16,
    color: "#fff",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#000080", // Dark green color
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black", // Dark green color
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#dc3545",
    borderWidth: 1,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});

export default MyAccount;