import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Link } from 'expo-router';

// Define the type for your route parameters
type RootStackParamList = {
  SearchResults: { search: string };
  // Add other routes here if needed
};

type FilterScreenRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

const Filter: React.FC = () => {
  const route = useRoute<FilterScreenRouteProp>();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    const urlParams = new URLSearchParams(route.params?.search || '');
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    // Here we construct the search URL to pass to the Link component
    return `/Find?${searchQuery}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(route.params?.search || '');
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [route.params?.search]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Pressable style={styles.searchButton} onPress={() => setSearchTerm('')}>
          <Ionicons name="close" size={24} color="black" />
        </Pressable>
      </View>
      <Link href={handleSubmit()}>
        <Pressable style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Filter;
