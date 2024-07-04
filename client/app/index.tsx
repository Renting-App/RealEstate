import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  TextInput,
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
          operation: residence.operation,
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
      <View
        style={[
          styles.typeContainer,
          item.operation === "rent" ? styles.rent : styles.sale,
        ]}
      >
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
      <Link
        href={{
          pathname: "/PropertyDetails",
          params: { residence: JSON.stringify(item) },
        }}
        asChild
      >
        <Button title="btn" />
      </Link>
    </ThemedView>
  );


  if (loading) {
    return (
      <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0007ff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
      
          <Image style={styles.menuIcon} /> icon
      
        <ThemedText type="title" style={styles.companyName}>
          Rent&Sell
        </ThemedText>
      </View>
      <View style={styles.banner}>
        <Image
          source={require("../assets/images/banner01.jpg")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <ThemedText type="title" style={styles.bannerTitle}>
            Discover Your New Home
          </ThemedText>
          <ThemedText type="subtitle" style={styles.bannerSubtitle}>
            Helping 100 thousand renters and sellers
          </ThemedText>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a property..."
            />
            <Button title="Search" onPress={() => { }} />
          </View>
        </View>
      </View>
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
  bgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  companyName: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
  },
  banner: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  bannerContent: {
    position: "absolute",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
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
  sidebar: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
});

export default HousesScreen;
