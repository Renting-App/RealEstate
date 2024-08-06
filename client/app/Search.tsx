import React from "react";
import { TextInput, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (query: string) => void;
  placeholder: string;
  style?: ViewStyle | TextStyle;
}

const Search: React.FC<Props> = ({ searchQuery, setSearchQuery, onSearch, placeholder, style }) => {
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[styles.input, style]} // Combine default styles with the passed style
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.iconContainer} onPress={() => onSearch(searchQuery)}>
        <Ionicons name="search" size={20} color="black" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3, // Add shadow for depth
    paddingHorizontal: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    width: "80%", // Adjust width to fit most screens
  },
  iconContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
});

export default Search;