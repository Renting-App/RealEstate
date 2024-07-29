import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const EditProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null);
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
          console.log("Authenticated user ID: ", currentUser.uid);
          const userDocRef = doc(firestore, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log("User document data: ", userDoc.data());
            setUser(userDoc.data());
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
            currentUser.email,
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

    const updatedUser = { ...user };
    delete updatedUser.password;

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Edit Profile
        </ThemedText>

        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.formGroupHeader}
            onPress={() =>
              setEditField(editField === "username" ? null : "username")
            }
          >
            <Ionicons name="person" size={20} color="#007bff" />
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
            <Ionicons name="mail" size={20} color="#007bff" />
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
            <Ionicons name="call" size={20} color="#007bff" />
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
            <Ionicons name="lock-closed" size={20} color="#007bff" />
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
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
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
    fontSize: 14,
    color: "#495057",
    marginLeft: 10,
  },
  valueText: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;
