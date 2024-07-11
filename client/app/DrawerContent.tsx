// hetha el sidebar

import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const DrawerContent: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  return (
    <View style={[styles.sidebar, isVisible ? styles.sidebarVisible : styles.sidebarHidden]}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={24} color="black" />
      </Pressable>
      <ThemedText type="title">Sidebar Content</ThemedText>
      <Link href={'/AboutUs'}>
        <ThemedText type="subtitle">About Us</ThemedText>
      </Link>
      <Link href={'/FAQ'}>
        <ThemedText type="subtitle">FAQ</ThemedText>
      </Link>
      <Link href={'/SignIn'}>
        <ThemedText type="subtitle">signin</ThemedText>
      </Link>
      <Link href={'/SignUp'}>
        <ThemedText type="subtitle">signup</ThemedText>
      </Link>
      {/* <Link href={'/welcome'}>
        <ThemedText type="subtitle">welcome</ThemedText>
      </Link> */}

    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    backgroundColor: "#fff",
    zIndex: 1000,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sidebarHidden: {
    left: -250,
  },
  sidebarVisible: {
    left: 0,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default DrawerContent;
