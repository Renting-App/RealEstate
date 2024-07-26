import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import importedStyles from "./styles";
import { RootStackParamList } from "./_layout";
import { StackNavigationProp } from "@react-navigation/stack";

interface Property {
  _id: string;
  title: string;
  address: string;
  price: string;
  images: string[];
}

type MyPropertiesNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyProperties"
>;

const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<MyPropertiesNavigationProp>();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    fetch("http://192.168.1.105:5800/houses")
      .then((response) => response.json())
      .then((data) => {
        const mappedProperties = data.map((property: any) => ({
          _id: property._id || `id_${Date.now()}`,
          title: property.title || "Untitled",
          address: property.address || "No address provided",
          price: property.price || "Price not available",
          images: property.images || [],
        }));

        setProperties(mappedProperties);
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
        `http://192.168.1.13:5800/deletehouse/${_id}`,
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
          <View style={localStyles.button}>
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
          </View>
          <View style={localStyles.button}>
            <Button title="Update" onPress={() => navigateToUpdateForm(item)} />
          </View>
        </View>
      </ThemedView>
    );
  };

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#0007ff" />
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
    flex: 1,
    marginHorizontal: 5,
  },
});

export default MyProperties;
