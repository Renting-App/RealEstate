import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useNavigation, useFocusEffect } from "expo-router";
import DrawerContent from "@/app/DrawerContent";
import Search from "./Search";
import Pagination from "./Pagination";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./_layout";

type HousesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HousesScreen"
>;

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
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);

  const navigation = useNavigation<HousesScreenNavigationProp>();

  useEffect(() => {
    fetchResidences();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchResidences();
    }, [])
  );

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchResidences = () => {
    setLoading(true);
    fetch("http://192.168.1.22:5800/houses")
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
          operation: residence.operation ?? "",
          category: residence.category ?? "",
          location: residence.location ?? "",
          subLocation: residence.subLocation ?? "",
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
              navigation={navigation}
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
    color: "#333",
  },
  bgContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  banner: {
    flexDirection: "row",
    height: 200,
    marginBottom: 10,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
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
  cardsContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    elevation: 2,
  },
  typeContainer: {
    borderRadius: 4,
    padding: 5,
    position: "absolute",
    top: 10,
    left: 10,
  },
  rent: {
    backgroundColor: "#ffcccc",
  },
  sale: {
    backgroundColor: "#ccffcc",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 4,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#666",
  },
  contact: {
    fontSize: 14,
    color: "#999",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#666",
  },
});

export default HousesScreen;
