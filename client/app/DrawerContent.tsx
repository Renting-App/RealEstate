// DrawerContent.tsx
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from "@/components/ThemedText";

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
      {/* Add more sidebar content here */}
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
