import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, Pressable, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; 

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('apartment');
  const [transactionType, setTransactionType] = useState('rent');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, category, transactionType);
    // Implement your search logic here Ines
    
  };

  return (
    
    <View style={styles.container}>
     <Text>ok</Text>
      <Ionicons name="search" size={24} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search for properties"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Apartment" value="apartment" />
        <Picker.Item label="House" value="house" />
        <Picker.Item label="Hotel" value="hotel" />
        <Picker.Item label="Residence" value="residence" />
        <Picker.Item label="Guesthouse" value="guesthouse" />
      </Picker>
      <Picker
        selectedValue={transactionType}
        onValueChange={(itemValue) => setTransactionType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="For Rent" value="rent" />
        <Picker.Item label="For Sale" value="sale" />
      </Picker>
      <Pressable style={styles.button} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:45,
    padding: 16,
    backgroundColor: '#fff',
  },
  icon: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 22 : 55, 
  },
  input: {
    paddingLeft: 40,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 40, 
  },
  picker: {
    marginVertical: 8,
    height: 40,
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
});

export default SearchScreen;
