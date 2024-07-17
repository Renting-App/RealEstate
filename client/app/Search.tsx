import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const Search: React.FC<Props> = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleSearch = (query: string) => {
    setSearchQuery(query); 
    onSearch(); 
  };

  return (
    <ThemedView style={styles.container}>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search for properties"
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: "65%"
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
});

export default Search;
