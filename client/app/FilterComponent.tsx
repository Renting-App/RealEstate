import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Switch } from 'react-native';
import { Button } from 'react-native';

interface Property {
  address: string;
  size: number;
  category: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  operation: string;
  dateOfCreation: string;
  rooms: number;
  bathrooms: number;
  visitsHistory: string[];
  amenities: string[];
}


//filterItem
interface FilterComponentProps {
  properties?: Property[]; // Make properties optional
  onFilter: (filteredProperties: Property[]) => void;
}

const categories = 
['Select Category', 'Apartment', 'House', 'Studio', 'Penthouse'];
const amenitiesList =
 ['Parking', 'AC', 'Furnished', 'Pool', 'Microwave', 'Near Station', 'Beach View', 'Alarm', 'Garden'];

const FilterComponent: React.FC<FilterComponentProps> = ({ properties = [], onFilter }) => { // Default properties to an empty array
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxBudget, setMaxBudget] = useState<number | null>(null);
  const [address, setAddress] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});

  const handleCategoryChange = (itemValue: string) => {
    setSelectedCategory(itemValue === 'Select Category' ? null : itemValue.toLowerCase());
  };

  const handleMaxBudgetChange = (text: string) => {
    setMaxBudget(text ? parseInt(text, 10) : null);
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prevAmenities => ({
      ...prevAmenities,
      [amenity]: !prevAmenities[amenity],
    }));
  };

  const handleFilter = () => {
    
    console.log('Category:', selectedCategory,
      'Max Budget:', maxBudget,
      'Address:', address,
      'Amenities:'
    );
    amenitiesList.forEach(amenity => {
      console.log(`${amenity}: ${selectedAmenities[amenity] ? 'true' : 'false'}`);
    });

    // Perform filtering logic here if needed
    // let filteredProperties = [...properties];
    // Apply filters and call onFilter(filteredProperties);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Filter Properties</Text>

      {/* Category */}
      <Text style={styles.subtitle}>Category</Text>
      <Picker
        style={styles.input}
        selectedValue={selectedCategory || ''}
        onValueChange={handleCategoryChange}
      >
        {categories.map((category, index) => (
          <Picker.Item key={index.toString()} 
          label={category} 
          value={category.toLowerCase()} />
        ))}
      </Picker>

      {/* Max Budget */}
      <Text style={styles.subtitle}>Max Budget</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={maxBudget ? maxBudget.toString() : ''}
        onChangeText={handleMaxBudgetChange}
        placeholder="Enter max budget"
      />

      {/* Address */}
      <Text style={styles.subtitle}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={handleAddressChange}
        placeholder="Enter address"
      />

      {/* Amenities */}
      <Text style={styles.subtitle}>Amenities</Text>
      {amenitiesList.map(amenity => (
        <View key={amenity} style={styles.checkboxContainer}>
          <Text>{amenity}</Text>
          <Switch
            value={selectedAmenities[amenity] || false}
            onValueChange={() => toggleAmenity(amenity)}
          />
        </View>
      ))}

      {/* Apply Filters Button */}
      <View style={styles.buttonContainer}>
        <Button title="Apply Filters" onPress={handleFilter} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default FilterComponent;
