import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

interface UpdateProfitProps {
  adminFee: number;
}

const UpdateProfit: React.FC<UpdateProfitProps> = ({ adminFee }) => {
  const [loading, setLoading] = useState(false);

  const updateProfit = async () => {
    try {
      setLoading(true);
      const adminDocRef = doc(firestore, "admin", "adminDocumentID");
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        const currentProfit = adminDoc.data().profit || 0;
        const newProfit = currentProfit + adminFee;

        await updateDoc(adminDocRef, { profit: newProfit });
        Alert.alert("Success", "Profit updated successfully!");
      } else {
        console.error("Admin document not found!");
        Alert.alert("Error", "Admin document not found!");
      }
    } catch (error) {
      console.error("Error updating profit:", error);
      Alert.alert("Error", "Failed to update profit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Admin Fee: {adminFee} DT</Text>
      <Button title="Update Profit" onPress={updateProfit} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: "#000080",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
  },
});

export default UpdateProfit;
