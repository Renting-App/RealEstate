import React from "react";
import { Pressable } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "./_layout";

// Define and export the HomeButton component
export function HomeButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("HousesScreen", { criteria: {} });
      }}
      style={({ pressed }) => [
        styles.homeButton,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <Ionicons name="home" size={24} color="black" />
    </Pressable>
  );
}

// Define styles for the HomeButton component
const styles = StyleSheet.create({
  homeButton: {
    marginRight: 15, // Adjust margin to position correctly in the header
  },
});

export default HomeButton;
