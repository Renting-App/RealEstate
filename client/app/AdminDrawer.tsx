//hetha el sidebar te3 l admin

import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StackNavigationProp } from '@react-navigation/stack';


type AdminDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
  navigation: StackNavigationProp<any, any>;
};

const AdminDrawer: React.FC<AdminDrawerProps> = ({ isVisible, onClose,navigation }) => {
  return (
    <View style={[styles.sidebar, isVisible ? styles.sidebarVisible : styles.sidebarHidden]}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close-circle" size={32} color="#333" />
      </Pressable>
      <View style={styles.linksContainer}>
       
        <Link href={'/ManagePosts'} style={styles.link}>
          <ThemedText type="subtitle">Manage Posts</ThemedText>
        </Link>

        <Pressable onPress={()=>{navigation.navigate('ManagePosts')}}>
          <ThemedText type="subtitle">Manage posts</ThemedText>
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
