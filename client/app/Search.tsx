import React from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <Input
        style={styles.inputValue}
        placeholder="Search by address"
        placeholderTextColor="black" // Set placeholder text color to black
        leftIcon={
          <Ionicons
            name="search"
            size={20}
            color="black"
            onPress={onSearch}
          />
        }
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch} // Trigger search when 'Enter' key is pressed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    marginTop: 15,
    width: "70%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputValue: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    paddingTop:4
  },
  input: {
    flex: 1,
    padding:0,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#cccccccc",
    justifyContent:"center",
    alignItems:"center"
  },
});

export default Search;
