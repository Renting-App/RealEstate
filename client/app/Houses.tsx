import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";

interface Residence {
  _id: number;
  address: string;
  price: string;
  description: string;
  contact_info: string;
  status: "pending" | "approved" | "declined";
  images: string[];
}

const HousesScreen = () => {
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.13:5000/api/gethouse")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
          _id: residence.idhouses,
          address: residence.address,
          price: residence.price,
          description: residence.description,
          contact_info: residence.contact_info,
          status: residence.status,
          images: JSON.parse(residence.images),
        }));
        setResidences(mappedResidences);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Residence }) => (
    <ThemedView style={[styles.card, { pointerEvents: "none" }]}>
      <View style={[styles.typeContainer, getStatusColor(item.status)]}>
        <ThemedText type="subtitle" style={styles.typeText}>
          {getStatusText(item.status)}
        </ThemedText>
      </View>
      <FlatList
        data={item.images}
        horizontal
        renderItem={({ item: image }) => (
          <Image source={{ uri: image }} style={styles.image} />
        )}
        keyExtractor={(image, index) => `${item._id}-${index}`}
      />
      <ThemedText type="subtitle" style={styles.title}>
        {item.address}
      </ThemedText>
      <Text>{item.description}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Contact: {item.contact_info}</Text>
      <Pressable style={styles.contactButton} onPress={() => handlePress(item)}>
        <ThemedText type="link" style={styles.contactButtonText}>
          Details
        </ThemedText>
      </Pressable>
    </ThemedView>
  );

  const getStatusColor = (status: "pending" | "approved" | "declined") => {
    switch (status) {
      case "pending":
        return styles.pending;
      case "approved":
        return styles.approved;
      case "declined":
        return styles.declined;
      default:
        return styles.pending;
    }
  };

  const getStatusText = (status: "pending" | "approved" | "declined") => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "declined":
        return "Declined";
      default:
        return "Pending";
    }
  };

  const handlePress = (residence: Residence) => {
    navigation.navigate("PropertyDetailsScreen/index", { residence });
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.pageTitle}>
        Houses
      </ThemedText>
      <FlatList
        data={residences}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.cardsContainer}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  cardsContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    position: "relative",
  },
  typeContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  pending: {
    backgroundColor: "#FFD700",
  },
  approved: {
    backgroundColor: "#32CD32",
  },
  declined: {
    backgroundColor: "#FF0000",
  },
  typeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  contactButton: {
    backgroundColor: "#0000FF",
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default HousesScreen;
