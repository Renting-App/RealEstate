import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  TextInput,
  Pressable,
  Dimensions
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import DrawerContent from "@/app/DrawerContent"; // Import the DrawerContent component

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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const itemsNumber = 3; // number of items we want to render
  const [limit, setLimit] = useState(itemsNumber);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    fetch("http://localhost:5000/api/gethouse")
      .then((response) => response.json())
      .then((data) => {
        // Limiting to only 3 items
        const limitedResidences = data.slice(start, limit).map((residence: any) => ({
          _id: residence.idhouses,
          address: residence.address,
          price: residence.price,
          description: residence.description,
          contact_info: residence.contact_info,
          images: residence.images,
          operation: residence.operation,
        }));
        setResidences(limitedResidences);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
        setLoading(false);
      });
  }, [start, limit]);

  
  const handleNext = () => {
    if ( residences.length >= itemsNumber ) {
    setStart(start + itemsNumber);
    setLimit(limit + itemsNumber);
   }
  else {
    setStart(0);
    setLimit(itemsNumber)
  }
}

  const handlePrev = () => {
    if (start > 0)
    {setStart(start - itemsNumber);
    setLimit(limit - itemsNumber);}
    else {
      setStart(residences.length - itemsNumber);
      setLimit(residences.length)
    }
 
  }
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
        <Button title="Details" />
      </Link>
    </ThemedView>
  );

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <DrawerContent isVisible={isSidebarVisible} onClose={() => setIsSidebarVisible(false)} />
      <View style={styles.header}>
        <Pressable onPress={() => setIsSidebarVisible(true)}>
          <Ionicons name="menu" style={styles.menuIcon} size={24} />
        </Pressable>
        <ThemedText type="title" style={[styles.bgContainer , { 
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',  // Adjust color to your preference
    textTransform: 'uppercase',
    letterSpacing: 1,  // Increase or decrease letter spacing as desired
    fontFamily: 'Arial',  // Use a suitable font family
  }]}>
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
            <Pressable style={[styles.searchButton]}> <ThemedText style= {styles.buttonText} >Search</ThemedText> </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={residences}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.cardsContainer}
      />
      {/* Previous Button */}
      <Pressable style={styles.prevButton} onPress={handlePrev}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>
      {/* Next Button */}
      <Pressable style={styles.nextButton} onPress={handleNext}>
        <Ionicons name="arrow-forward" size={24} color="#000" />
      </Pressable>
    </ThemedView>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  menuIcon: {
    marginLeft: 10,
  },
  bgContainer: {
    textAlign: "center",
  },
  banner: {
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  bannerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    marginTop: 10,
    width: width * 0.8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#1183CE",
    borderRadius: 10,  // Make the button rounder by increasing the borderRadius
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
  },
  buttonText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  cardsContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  typeContainer: {
    borderRadius: 4,
    padding: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  rent: {
    backgroundColor: "#6FDCE3",
  },
  sale: {
    backgroundColor: "#FFC700",
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  price: {
    marginBottom: 10,
  },
  contact: {
    marginBottom: 10,
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
  sidebarHidden: {
    left: -250,
  },
  sidebarVisible: {
    left: 0,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  prevButton: {
    position: "absolute",
    bottom: 2,
    left: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
  nextButton: {
    position: "absolute",
    bottom: 2,
    right: 20,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
});

export default HousesScreen;
