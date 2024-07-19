import React from "react";
import { Pressable } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "./_layout";

export function HomeButton() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("HousesScreen");
      }}
      style={({ pressed }) => [
        buttonstyles.homeButton,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <Ionicons name="home" size={24} color="black" />
    </Pressable>
  );
}

const buttonstyles = StyleSheet.create({
  homeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1, // Ensure it stays on top of other elements
  },
});

export default buttonstyles;
