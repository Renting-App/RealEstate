import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/assets/IPaddress";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import importedStyles from "./styles";
import { RootStackParamList } from "./_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAuth } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Property {
  _id: string;
  title: string;
  address: string;
  price: string;
  images: string[];
  iduser: string;
}

type MyPropertiesNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyProperties"
>;

const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation<MyPropertiesNavigationProp>();

  useEffect(() => {
    const fetchUserId = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        console.log("No user is signed in!");
      }
    };

    fetchUserId();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        fetchProperties();
      }
    }, [userId])
  );

  const fetchProperties = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/houses`)
      .then((response) => response.json())
      .then((data) => {
        const mappedProperties = data.map((property: any) => ({
          _id: property._id || `id_${Date.now()}`,
          title: property.title || "Untitled",
          address: property.address || "No address provided",
          price: property.price || "Price not available",
          images: property.images || [],
          iduser: property.iduser,
        }));

      
        const userProperties = mappedProperties.filter(
          (property: Property) => property.iduser === userId
        );

        setProperties(userProperties);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/deletehouse/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete property");
      }

      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== _id)
      );
      Alert.alert("Success", "Property deleted successfully.");
    } catch (error) {
      console.error("Error deleting property:", error);
      Alert.alert(
        "Error",
        (error as Error).message ||
          "An error occurred while deleting the property."
      );
    }
  };

  const handleUpdate = (updatedProperty: Property) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property._id === updatedProperty._id ? updatedProperty : property
      )
    );
  };

  const navigateToUpdateForm = (property: Property) => {
    navigation.navigate("UpdatePropertyForm", {
      property,
      onUpdate: handleUpdate,
    });
  };

  const renderItem = ({ item }: { item: Property }) => {
    return (
      <ThemedView style={importedStyles.card}>
        <Image
          source={{ uri: item.images[0] }}
          style={importedStyles.image}
          resizeMode="contain"
        />
        <ThemedText type="subtitle" style={importedStyles.title}>
          {item.title}
        </ThemedText>
        <ThemedText type="default" style={importedStyles.price}>
          Price: {item.price}
        </ThemedText>
        <ThemedText type="default" style={importedStyles.contact}>
          Address: {item.address}
        </ThemedText>
        <View style={localStyles.buttonContainer}>
          <TouchableOpacity
            style={[localStyles.button, localStyles.deleteButton]}
            onPress={() => handleDelete(item._id)}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" />
            <Text style={localStyles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[localStyles.button, localStyles.updateButton]}
            onPress={() => navigateToUpdateForm(item)}
          >
            <Ionicons name="create-outline" size={20} color="#fff" />
            <Text style={localStyles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  };

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (properties.length === 0) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ThemedText type="default" style={{ fontSize: 18 }}>
          No properties available
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={importedStyles.container}>
      <FlatList
        data={properties}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={importedStyles.cardsContainer}
      />
    </ThemedView>
  );
};

const localStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  updateButton: {
    backgroundColor: "#007bff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default MyProperties;
