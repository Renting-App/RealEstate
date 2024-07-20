// MyAccount.js
import React from "react";
import { View, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import styles from "./styles"; // Importing styles

const MyAccount = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        My Account
      </ThemedText>
      <Link href="/MyProperties" asChild>
        <Button title="My Properties" />
      </Link>
    </View>
  );
};

export default MyAccount;
