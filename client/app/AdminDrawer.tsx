import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from "@/components/ThemedText";
import { Link, useNavigation } from "expo-router";
import { StackNavigationProp } from '@react-navigation/stack';

type AdminDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  navigation: StackNavigationProp<any, any>;
};

const AdminDrawer: React.FC<AdminDrawerProps> = ({ isVisible, onClose, navigation }) => {
  return (
    <View style={[styles.sidebar, isVisible ? styles.sidebarVisible : styles.sidebarHidden]}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close-circle" size={32} color="#333" />
      </Pressable>
      <View style={styles.linksContainer}>
        <Pressable onPress={() => navigation.navigate('ManagePosts')} style={styles.link}>
          <ThemedText type="subtitle">Manage Posts</ThemedText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Profit')} style={styles.link}>
          <ThemedText type="subtitle">Profit</ThemedText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('AcceptRequests')} style={styles.link}>
          <ThemedText type="subtitle">Accept Requests</ThemedText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 25,
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
});

export default AdminDrawer;