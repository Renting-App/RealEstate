import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./_layout";
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
  visits: [];
  favourite: boolean;
  date_of_creation: string;
  amenities: {
    parking: boolean;
    ac: boolean;
    furnished: boolean;
    pool: boolean;
    microwave: boolean;
    near_subway: boolean;
    beach_view: boolean;
    alarm: boolean;
    garden: boolean;
  };
  status: string;
  notification: string;
  iduser: string;
  condition: string;
  map: {
    latitude: number;
    longitude: number;
  };
  __v: number;
}

const HousesScreen: React.FC<HousesScreenProps> = ({ route }) => {
  const { criteria = {} } = route.params || {};
  // console.log("Received criteria:", criteria); // Debugging
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

  const fetchResidences = () => {
    setLoading(true);
    fetch("http://192.168.1.13:5800/houses")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
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
        }));
        setResidences(mappedResidences);
        filterResidences(mappedResidences, criteria);
        console.log('f',filteredResidences);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
        setLoading(false);
      });
  };

  const filterResidences = (residences: Residence[], criteria: any) => {
    // console.log("Filtering with criteria:", criteria); // Debugging
    const filtered = residences.filter((residence) => {
      const meetsCategory = !criteria.category || residence.category === criteria.category;
      const meetsLocation = !criteria.location || residence.location === criteria.location;
      const meetsSubLocation = !criteria.subLocation || residence.subLocation === criteria.subLocation;
      const meetsOperation = !criteria.operation || residence.operation === criteria.operation;
      const meetsPriceMax = !criteria.priceMax || parseFloat(residence.price) <= parseFloat(criteria.priceMax);
      const meetsPriceMin = !criteria.priceMin || parseFloat(residence.price) >= parseFloat(criteria.priceMin);

      // console.log(`Residence: ${residence.title}`, {
      //   meetsCategory,
      //   meetsLocation,
      //   meetsSubLocation,
      //   meetsOperation,
      //   meetsPriceMax,
      //   meetsPriceMin
      // }); // Debugging

      return meetsCategory && meetsLocation && meetsSubLocation && meetsOperation && meetsPriceMax && meetsPriceMin;
    });
    // console.log("Filtered Residences:", filtered); // Debugging
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

  const handleDetailsPress = (residence: Residence) => {
    navigation.navigate("PropertyDetails", {
      residence: JSON.stringify(residence),
    });
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
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleDetailsPress(item)}
      >
        <Ionicons name="information-circle-outline" size={24} color="#fff" />
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </ThemedView>
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
              <TouchableOpacity onPress={() => setIsSidebarVisible(true)}>
                <Ionicons name="menu" style={styles.menuIcon} size={24} />
              </TouchableOpacity>
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
              <View style={styles.bannerOverlay} />
              <View style={styles.bannerContent}>
                <ThemedText type="title" style={styles.bannerTitle}>
                  Discover Your New Home
                </ThemedText>
                <ThemedText type="subtitle" style={styles.bannerSubtitle}>
                  Helping 100 thousand renters and sellers
                </ThemedText>
                <View style={styles.searchContainer}>
                  <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                  />
                </View>
              </View>
            </View>
            {filteredResidences.length === 0 ? (
              <ThemedText 
              // style={styles.noDataText}
              >
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
    height: 200,
    marginBottom: 10,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bannerContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 5,
  },
  searchContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
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
    backgroundColor: "#ccffcc",
  },
  typeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: "90%",
    height: 200,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf:"center"
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
    marginBottom: 10,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    elevation: 3,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#666",
  },
});

export default HousesScreen;
