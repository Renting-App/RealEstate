import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from "firebase/auth";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

interface User {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  image?: string; // Optional because the image may not be set
}

const EditProfile = () => {
  const [user, setUser] = useState<User>({
    password: '',
    username: "",
    email: "",
    phone_number: "",
    image: '', // Add this state for the profile image
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null); // Use any or a more specific type if known
  const [editField, setEditField] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
            setUser(userDoc.data() as User); // Cast to User type
          } else {
            console.log("No such user document!");
          }
        } else {
          console.log("No user is signed in!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleSave = async () => {
    if (newPassword || confirmPassword) {
      if (!oldPassword) {
        Alert.alert("Error", "Please enter your old password");
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "New passwords do not match");
        return;
      }

      try {
        const currentUser = auth.currentUser;
        if (currentUser && oldPassword) {
          const credential = EmailAuthProvider.credential(
            currentUser.email!,
            oldPassword
          );
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, newPassword);
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "Old password is incorrect or failed to update password"
        );
        return;
      }
    }

    const { password, ...updatedUser } = user; // Exclude password field

    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateDoc(doc(firestore, "users", currentUser.uid), updatedUser);
        setLoading(false);
        Alert.alert("Success", "Profile updated successfully");
        router.push("/MyAccount");
      } else {
        console.log("No user is signed in!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
      setError(error);
      setLoading(false);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUser({ ...user, image: result.assets[0].uri });
    }
  };
  const handleDeleteAccount = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        // Delete user from Firestore
        await deleteDoc(doc(firestore, 'users', currentUser.uid));

        // Delete user from Firebase Authentication
        await deleteUser(currentUser);

        // Show success message
        Alert.alert('Success', 'Account deleted successfully', [
          { text: 'OK', onPress: () => router.push('/Welcome') },
        ]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    } else {
      setError('No user is currently signed in');
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirm Account Deletion',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDeleteAccount },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Edit Profile
        </ThemedText>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={pickImage}
        >
          <Image
            source={{ uri: user.image || 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
          <Ionicons name="camera" size={30} color="#000080" style={styles.cameraIcon} />
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formGroupHeader}
            onPress={() =>
              setEditField(editField === "username" ? null : "username")
            }
          >
            <Ionicons name="person" size={20} color="#000080" />
            <ThemedText type="label" style={styles.label}>
              Username
            </ThemedText>
          </TouchableOpacity>
          {editField === "username" && (
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={user.username}
              onChangeText={(text) => setUser({ ...user, username: text })}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formGroupHeader}
            onPress={() => setEditField(editField === "email" ? null : "email")}
          >
            <Ionicons name="mail" size={20} color="#000080" />
            <ThemedText type="label" style={styles.label}>
              Email
            </ThemedText>
          </TouchableOpacity>
          {editField === "email" && (
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formGroupHeader}
            onPress={() =>
              setEditField(editField === "phone_number" ? null : "phone_number")
            }
          >
            <Ionicons name="call" size={20} color="#000080" />
            <ThemedText type="label" style={styles.label}>
              Phone Number
            </ThemedText>
          </TouchableOpacity>
          {editField === "phone_number" && (
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={user.phone_number}
              onChangeText={(text) => setUser({ ...user, phone_number: text })}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formGroupHeader}
            onPress={() =>
              setEditField(editField === "password" ? null : "password")
            }
          >
            <Ionicons name="lock-closed" size={20} color="#000080" />
            <ThemedText type="label" style={styles.label}>
              Change Password
            </ThemedText>
          </TouchableOpacity>
          {editField === "password" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
              />
            </>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <ThemedText style={styles.buttonText}>Save</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={confirmDeleteAccount}
        >
          <ThemedText style={styles.buttonText}>Delete Account</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000080", // Light green background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000080", // Dark green
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  formGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000040", // Dark green
  },
  input: {
    height: 40,
    borderColor: "#000080", // Green border
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#000080", // Dark green
  },
  button: {
    backgroundColor: "#000080", // Green
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#000080",
    borderWidth: 2,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default EditProfile;
