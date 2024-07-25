import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "./ThemeContext"; // Adjust path as needed
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DrawerContent from "@/app/DrawerContent";
import Search from "./Search";
import Pagination from "./Pagination";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from './_layout'
import { Link } from "expo-router";




type HousesScreenProps = {
  route: RouteProp<RootStackParamList, "HousesScreen">;
};

const itemsPerPage = 3;

interface Residence {
  _id: string;
  title: string;
  address: string;
  price: string;
  rooms: string;
  bathrooms: string;
  size: string;
  category: string;
  location: string;
  subLocation: string;
  description: string;
  contact_info: string;
  images: string[];
  operation: "rent" | "sale";
}

const HousesScreen: React.FC<HousesScreenProps> = ({ route }) => {
  const { criteria = {} } = route.params || {};
  const { criteria = {} } = route.params || {};
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);
  const { isDarkMode, toggleTheme } = useTheme(); // Access theme context

  useEffect(() => {
    fetchResidences();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchResidences = () => {
    fetch("http://192.168.1.13:5800/houses")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
          _id: residence._id ?? `id_${Date.now()}`,
          title: residence.title ?? "",
          address: residence.address ?? "",
          size: residence.size ?? "",
          price: residence.price ?? "",
          rooms: residence.rooms ?? "",
          bathrooms: residence.bathrooms ?? "",
          description: residence.description ?? "",
          contact_info: residence.contact_info ?? "",
          images: residence.images ?? [],
          visits: residence.visits ?? "",
          operation: residence.operation ?? "",
          amenities: residence.amenities ?? "",
          location: residence.location ?? "",
          subLocation: residence.subLocation ?? "",
          condition: residence.condition ?? "",
          favourite: residence.favourite ?? false,
          map: residence.map ?? "",
        }));
        filterResidences(mappedResidences, criteria);
        setResidences(mappedResidences);
        setFilteredResidences(mappedResidences);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
        setLoading(false);
      });
  };

  const filterResidences = (residences: Residence[], criteria: any) => {
    const filtered = residences.filter((residence) => {
      return (
        (!criteria.category || residence.category === criteria.category) &&
        (!criteria.location || residence.location === criteria.location) &&
        (!criteria.subLocation ||
          residence.subLocation === criteria.subLocation) &&
        (!criteria.operation || residence.operation === criteria.operation) &&
        (!criteria.priceMax ||
          parseFloat(residence.price) <= parseFloat(criteria.priceMax)) &&
        (!criteria.priceMin ||
          parseFloat(residence.price) >= parseFloat(criteria.priceMin))
      );
    });
    setFilteredResidences(filtered);
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredResidences(residences);
    } else {
      const filteredData = residences.filter((residence) =>
        residence.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResidences(filteredData);
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredResidences.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
        source={{ uri: item.images[0] }}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedText type="subtitle" style={styles.title}>
        {item.title}
      </ThemedText>

      <ThemedText type="default" style={styles.price}>
        Price: {item.price}DT
      </ThemedText>
      <ThemedText type="default" style={styles.contact}>
        Address: {item.address}
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
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#0007ff" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Button title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} onPress={toggleTheme} />
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
          handlePageChange(currentPage + 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            handlePageChange(currentPage - 1);
          }
        }}
      >
        <View style={{ flex: 1 }}>
          <ThemedView style={styles.container}>
            <DrawerContent
              isVisible={isSidebarVisible}
              onClose={() => setIsSidebarVisible(false)}
            />
            <View style={styles.header}>
              <Pressable onPress={() => setIsSidebarVisible(true)}>
                <Ionicons name="menu" style={styles.menuIcon} size={24} />
              </Pressable>
              <ThemedText
                type="title"
                style={[
                  styles.bgContainer,
                  {
                    fontSize: 22,
                    fontWeight: "bold",
                    color: "#333",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  },
                ]}
              >
                Rent&Sell
              </ThemedText>
              {/* Dark/Light Mode Toggle Button */}
              <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
                <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color="#333" />
                <ThemedText type="subtitle" style={styles.toggleText}>
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </ThemedText>
              </TouchableOpacity>
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
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onSearch={handleSearch}
                />
              </View>
            </View>
            {filteredResidences.length === 0 ? (
              <ThemedText style={styles.noDataText}>
                No matching properties found.
              </ThemedText>
            ) : (
              <>
                <FlatList
                  data={filteredResidences.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  contentContainerStyle={styles.cardsContainer}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </ThemedView>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  bannerSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeContainer: {
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  rent: {
    backgroundColor: "#f0ad4e",
  },
  sale: {
    backgroundColor: "#d9534f",
  },
  typeText: {
    color: "#fff",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    color: "#555",
  },
  contact: {
    fontSize: 14,
    color: "#777",
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleText: {
    marginLeft: 8,
  },
});

export default HousesScreen;
