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
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import DrawerContent from "@/app/DrawerContent";
import Search from "./Search";
import styles from "./styles"; // Importing styles
import Favourite from "./Favorite";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout'; // Adjust the path as necessary

type HousesScreenProps = {
  route: RouteProp<RootStackParamList, 'HousesScreen'>;
};
const itemsPerPage = 3;

interface Residence {
  _id: number;
  title: string;
  address: string;
  price: string;
  rooms:string;
  bathrooms:string;
  size:string;
  category: string;
  location: string;
  subLocation: string;
  description: string;
  contact_info: string;
  images: string[];
  operation: "rent" | "sale";
}

const HousesScreen:React.FC<HousesScreenProps> = ({route}) => {
  const { criteria } = route.params || {};
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResidences, setFilteredResidences] = useState<Residence[]>([]);

  useEffect(() => {
    fetchResidences();
  }, []);
 const fetchResidences = () => {
    fetch("http://192.168.1.13/:5000/api/gethouse")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence: any) => ({
          _id: residence.idhouses,
          title: residence.title,
          address: residence.address,
          size: residence.size,
          price: residence.price,
          rooms: residence.rooms,
          bathrooms: residence.bathrooms,
          description: residence.description,
          contact_info: residence.contact_info,
          images: residence.images,
          visits: residence.visits,
          operation: residence.operation,
          amenities:residence.amenities,
          category:residence.category,
          location:residence.location,
          subLocation:residence.subLocation,
          condition : residence.condition,
          Favourite:residence.favourite,
          map:residence.map

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
        (!criteria.subLocation || residence.subLocation === criteria.subLocation) &&
        (!criteria.operation || residence.operation === criteria.operation) &&
        (!criteria.priceMax  || parseFloat(residence.price) <= parseFloat(criteria.priceMax)) &&
        (!criteria.priceMin  || parseFloat(residence.price) >= parseFloat(criteria.priceMin))

      );
    });
    setFilteredResidences(filtered);
  };
  const handleSearch = () => {
    const filteredData = residences.filter((residence) =>
      residence.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResidences(filteredData);
    setCurrentPage(1); // Reset the pagination to the first page
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
      <FlatList
        data={filteredResidences.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.cardsContainer}
      />
       


      <Pressable style={styles.prevButton} onPress={handlePrev}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </Pressable>
      <Pressable style={styles.nextButton} onPress={handleNext}>
        <Ionicons name="arrow-forward" size={24} color="#000" />
      </Pressable>
    </ThemedView>
  );
};

export default HousesScreen;
