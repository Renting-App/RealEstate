import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Button
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

interface Residence {
  _id: number;
  address: string;
  price: string;
  description: string;
  contact_info: string;
  images: string[];
  operation: "rent" | "sale";
  status: "pending" | "approved" | "declined";
}

const HousesScreen = () => {
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/gethouse")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
          _id: residence.idhouses,
          address: residence.address,
          price: residence.price,
          description: residence.description,
          contact_info: residence.contact_info,
          images: residence.images,
          operation: residence.type,
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
    <ThemedView style={styles.card}>
      <View style={[styles.typeContainer, item.operation === "rent" ? styles.rent : styles.sale]}>
        <ThemedText type="subtitle" style={styles.typeText}>
          {item.operation === "rent" ? "Rent" : "Sale"}
        </ThemedText>
      </View>
      <Image
        source={{ uri: item.images[0] }} // Render only the first image
        style={styles.image}
        resizeMode="center"
      />
      <ThemedText type="subtitle" style={styles.title}>
        {item.address}
      </ThemedText>
      <ThemedText type="default" style={styles.description}>
        {item.description}
      </ThemedText>
      <ThemedText type="default" style={styles.price}>
        Price: {item.price}
      </ThemedText>
      <ThemedText type="default" style={styles.contact}>
        Contact: {item.contact_info}
      </ThemedText>
      <Link href={{ pathname: "/PropertyDetails", params: { residence: JSON.stringify(item) } }} asChild >
        <Button title="details" />
      </Link>
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0007ff" />
      </ThemedView>
    );
  }

  return (
    <View style={[styles.container,{flex:1,alignItems:'center',justifyContent:'center'}]}>
      <ThemedText type="title" style={styles.pageTitle}>Home</ThemedText>
      <FlatList
        data={residences}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  searchBar: {
    height: 40,
    width: "70%",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    alignSelf: "center",
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
  rent: {
    backgroundColor: "#00FF00",
  },
  sale: {
    backgroundColor: "#FF0000",
  },
  typeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  price: {
    fontSize: 14,
    marginBottom: 16,
  },
  contact: {
    fontSize: 14,
    marginBottom: 16,
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
