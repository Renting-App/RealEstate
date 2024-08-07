import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/assets/IPaddress";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  RefreshControl,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./_layout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import DrawerContent from "@/app/DrawerContent";
import Search from "./Search";
import Profile from "./Profile";
import * as Location from "expo-location";

type HousesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HousesScreen"
>;

type HousesScreenProps = {
  route: RouteProp<RootStackParamList, "HousesScreen">;
};

const itemsPerFetch = 3;

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
  visits: [];
  favourite: boolean;
  date_of_creation: string;
  amenities: any;
  status: string;
  notification: string;
  iduser: string;
  condition: string;
  map: {
    latitude: number;
    longitude: number;
  };
  __v: number;
  popular: number;
  recommended: number;
}

const HousesScreen: React.FC<HousesScreenProps> = ({ route }) => {
  const { criteria = {} } = route.params || {};
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);
  const [displayedResidences, setDisplayedResidences] = useState<Residence[]>(
    []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "popular" | "recommended" | "near"
  >("popular");
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const navigation = useNavigation<HousesScreenNavigationProp>();

  useEffect(() => {
    fetchResidences();
    fetchLocation();
  }, []);

  const fetchResidences = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/houses`)
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data
          .map((residence: any) => ({
            _id: residence._id ?? `id_${Date.now()}`,
            title: residence.title ?? "",
            address: residence.address ?? "",
            size: residence.size ?? 0,
            price: residence.price ?? 0,
            rooms: residence.rooms ?? 0,
            bathrooms: residence.bathrooms ?? 0,
            description: residence.description ?? "",
            contact_info: residence.contact_info ?? "",
            images: residence.images ?? [],
            operation: residence.operation ?? "",
            category: residence.category ?? "",
            location: residence.location ?? "",
            subLocation: residence.subLocation ?? "",
            visits: residence.visits ?? [],
            favourite: residence.favourite ?? false,
            date_of_creation: residence.date_of_creation ?? "",
            amenities: residence.amenities ?? {},
            status: residence.status ?? "",
            notification: residence.notification ?? "",
            iduser: residence.iduser ?? "",
            condition: residence.condition ?? "",
            map: residence.map ?? {},
            popular: residence.popular ?? 0,
            recommended: residence.recommended ?? 0,
          }))
          .sort((a:any, b:any) => b.popular - a.popular); 

        setResidences(mappedResidences);
        setFilteredResidences(mappedResidences);
        setDisplayedResidences(mappedResidences.slice(0, itemsPerFetch));
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchResidences();
  };

  const filterResidences = (residences: Residence[], criteria: any) => {
    const filtered = residences.filter((residence) => {
      const meetsCategory =
        !criteria.category || residence.category === criteria.category;
      const meetsLocation =
        !criteria.location || residence.location === criteria.location;
      const meetsSubLocation =
        !criteria.subLocation || residence.subLocation === criteria.subLocation;
      const meetsOperation =
        !criteria.operation || residence.operation === criteria.operation;
      const meetsPriceMax =
        !criteria.priceMax ||
        parseFloat(residence.price) <= parseFloat(criteria.priceMax);
      const meetsPriceMin =
        !criteria.priceMin ||
        parseFloat(residence.price) >= parseFloat(criteria.priceMin);

      return (
        meetsCategory &&
        meetsLocation &&
        meetsSubLocation &&
        meetsOperation &&
        meetsPriceMax &&
        meetsPriceMin
      );
    });
    setFilteredResidences(filtered);
    setDisplayedResidences(filtered.slice(0, itemsPerFetch));
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredResidences(residences);
      setDisplayedResidences(residences.slice(0, itemsPerFetch));
    } else {
      const filteredData = residences.filter((residence) =>
        residence.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResidences(filteredData);
      setDisplayedResidences(filteredData.slice(0, itemsPerFetch));
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const start = (page - 1) * itemsPerFetch;
    const end = start + itemsPerFetch;
    setDisplayedResidences(filteredResidences.slice(start, end));
  };

  const handleShowMore = () => {
    const newDisplayedCount = displayedResidences.length + itemsPerFetch;
    setDisplayedResidences(filteredResidences.slice(0, newDisplayedCount));
  };

  const handleDetailsPress = (residence: Residence) => {
    navigation.navigate("PropertyDetails", {
      residence: JSON.stringify(residence),
    });
  };

  const handleFilterPress = () => {
    navigation.navigate("FilterComponent");
  };

  const handleRentPress = () => {
    const rentCriteria = { ...criteria, operation: "rent" };
    filterResidences(residences, rentCriteria);
  };

  const handleSalePress = () => {
    const saleCriteria = { ...criteria, operation: "sale" };
    filterResidences(residences, saleCriteria);
  };

  const handlePopularPress = () => {
    const sortedResidences = [...residences].sort(
      (a, b) => b.popular - a.popular
    );
    setSelectedTab("popular");
    setFilteredResidences(sortedResidences);
    setDisplayedResidences(sortedResidences.slice(0, itemsPerFetch));
    setCurrentPage(1);
  };

  const handleRecommendedPress = () => {
    const sortedResidences = [...residences].sort(
      (a, b) => b.recommended - a.recommended
    );
    setSelectedTab("recommended");
    setFilteredResidences(sortedResidences);
    setDisplayedResidences(sortedResidences.slice(0, itemsPerFetch));
    setCurrentPage(1);
  };

  const handleNearYouPress = () => {
    if (currentLocation) {
      const filteredByDistance = residences.filter((residence) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          residence.map.latitude,
          residence.map.longitude
        );
        return distance <= 10; // 10 km radius
      });

      setSelectedTab("near");
      setFilteredResidences(filteredByDistance);
      setDisplayedResidences(filteredByDistance.slice(0, itemsPerFetch));
      setCurrentPage(1);
    } else {
      Alert.alert("Location not available", "Unable to fetch your location.");
    }
  };

  const renderItem = ({ item }: { item: Residence }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleDetailsPress(item)}
    >
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
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText type="default" style={styles.price}>
            {item.price} DT
          </ThemedText>
        </View>
        <ThemedText type="default" style={styles.address}>
          {item.address}
        </ThemedText>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="resize" size={16} color="#666" />
            <ThemedText type="default" style={styles.detailText}>
              {item.size} m²
            </ThemedText>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="bed" size={16} color="#666" />
            <ThemedText type="default" style={styles.detailText}>
              {item.rooms} Rooms
            </ThemedText>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water" size={16} color="#666" />
            <ThemedText type="default" style={styles.detailText}>
              {item.bathrooms} Bathrooms
            </ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContent
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        navigation={navigation}
      />
      <FlatList
        ListHeaderComponent={
          <ThemedView style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setIsSidebarVisible(true)}>
                <Ionicons name="menu" style={styles.menuIcon} size={24} />
              </TouchableOpacity>
              <View style={styles.profileContainer}>
                <Profile />
              </View>
            </View>
            <View style={styles.searchContainer}>
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search properties"
                style={styles.searchInput}
              />
              <TouchableOpacity onPress={handleFilterPress}>
                <FontAwesome
                  name="sliders"
                  size={24}
                  color="black"
                  style={styles.filterIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.filterContainer}>
              <TouchableOpacity
                style={styles.filterCard}
                onPress={handleRentPress}
              >
                <Image
                  source={require("../assets/images/rent.png")}
                  style={styles.filterCardImage}
                />
                <Text style={styles.filterCardText}>For Rent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterCard}
                onPress={handleSalePress}
              >
                <Image
                  source={require("../assets/images/sale.png")}
                  style={styles.filterCardImage}
                />
                <Text style={styles.filterCardText}>For Sale</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={handlePopularPress}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "popular" && styles.selectedTab,
                  ]}
                >
                  Popular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRecommendedPress}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "recommended" && styles.selectedTab,
                  ]}
                >
                  Recommended
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNearYouPress}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "near" && styles.selectedTab,
                  ]}
                >
                  Near You
                </Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        }
        data={displayedResidences}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListFooterComponent={
          displayedResidences.length < filteredResidences.length ? (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={handleShowMore}
            >
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          ) : null
        }
        ListFooterComponentStyle={styles.footer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  menuIcon: {
    color: "#333",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 10,
  },
  profileName: {
    fontSize: 16,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  filterCardImage: {
    width: "100%",
    height: 100,
  },
  filterCardText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginHorizontal: 20,
  },
  selectedTab: {
    textDecorationLine: "underline",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    width: "90%",
    alignSelf: "center",
  },
  typeContainer: {
    borderRadius: 4,
    padding: 5,
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  rent: {
    backgroundColor: "#ffcccc",
  },
  sale: {
    backgroundColor: "#A9A9A9",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  address: {
    fontSize: 14,
    color: "#999",
    marginVertical: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  detailText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  showMoreButton: {
    padding: 15,
    alignItems: "center",
  },
  showMoreText: {
    color: "#00796B",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
  },
});

export default HousesScreen;
