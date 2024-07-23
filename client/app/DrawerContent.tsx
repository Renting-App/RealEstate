// Sidebar.js
import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const DrawerContent: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <Pressable onPress={(e) => e.stopPropagation()} style={styles.sidebar}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close-circle" size={32} color="#333" />
        </Pressable>
        <View style={styles.linksContainer}>
          <Link href="/AboutUs" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">About Us</ThemedText>
            </View>
          </Link>
          <Link href="/FAQ" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">FAQ</ThemedText>
            </View>
          </Link>
          <Link href="/PostProperty" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="home-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">Post a Property</ThemedText>
            </View>
          </Link>
          <Link href="/FilterComponent" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="filter-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">Filter</ThemedText>
            </View>
          </Link>
          <Link href="/Maps" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="map-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">Map</ThemedText>
            </View>
          </Link>
          <Link href="/Favorite" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">Favourite</ThemedText>
            </View>
          </Link>
          <Link href="/MyAccount" style={styles.link}>
            <View style={styles.linkContent}>
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#333"
                style={styles.logo}
              />
              <ThemedText type="subtitle">My Account</ThemedText>
            </View>
          </Link>
        </View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
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
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  linksContainer: {
    marginTop: 20,
  },
  link: {
    marginBottom: 10,
    textDecorationLine: "none",
    color: "#333",
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginRight: 8,
  },
});

export default DrawerContent;
