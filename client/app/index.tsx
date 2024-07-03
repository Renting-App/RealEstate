import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { Pressable, TextInput, FlatList } from "react-native";

interface Property {
  id: string;
  type: "rent" | "sale";
  title: string;
  address: string;
  image: string;
  description: string;
  contact: string;
}

const mockData: Property[] = [
  {
    id: "1",
    type: "rent",
    title: "Cozy Apartment",
    address: "123 Main St, Anytown",
    image:
      "https://images1.apartments.com/i2/axMk19Jx10sVyvPye0ubNaS0eyGwvrMnfbSqhgWEFeA/117/1000m-chicago-il-1000m-chicago.jpg?p=1",
    description: "A cozy apartment in the heart of the city.",
    contact: "Contact Owner",
  },
  {
    id: "2",
    type: "sale",
    title: "Spacious House",
    address: "456 Elm St, Anycity",
    image:
      "https://images1.apartments.com/i2/NF-GijqHdoiU0AcGdrUF7wgNZrIl_pybJMjp1XJp3dk/117/mondial-river-west-chicago-il-building-photo.jpg?p=1",
    description: "A spacious house with a beautiful garden.",
    contact: "Contact Owner",
  },
];

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const handleSearch = (text: string) => {
    setSearch(text);
    console.log("Searching for:", text);
  };

  const handlePress = (property: Property) => {
    navigation.navigate("PropertyDetailsScreen/index", { property });
  };

  const renderItem = ({ item }: { item: Property }) => (
    <ThemedView style={styles.card}>
      <View
        style={[
          styles.typeContainer,
          item.type === "rent" ? styles.rent : styles.sale,
        ]}
      >
        <ThemedText type="subtitle" style={styles.typeText}>
          {item.type === "rent" ? "Rent" : "Sale"}
        </ThemedText>
      </View>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="center"
      />
      <ThemedText type="subtitle" style={styles.title}>
        {item.title}
      </ThemedText>
      <ThemedText type="default" style={styles.address}>
        {item.address}
      </ThemedText>
      <ThemedText type="default" style={styles.description}>
        {item.description}
      </ThemedText>
      <Pressable style={styles.contactButton} onPress={() => handlePress(item)}>
        <ThemedText type="link" style={styles.contactButtonText}>
          Details
        </ThemedText>
      </Pressable>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.pageTitle}>
        Find Your Dream Home
      </ThemedText>
      <TextInput
        id="searchInput"
        style={styles.searchBar}
        placeholder="Search for properties..."
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  address: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 8,
  },
  description: {
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

export default HomeScreen;
