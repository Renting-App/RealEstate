import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Switch, TouchableOpacity } from 'react-native';

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

interface FilterComponentProps {
  properties?: Property[];
  onFilter: (filteredProperties: Property[]) => void;
}

const amenitiesList = ['Parking', 'AC', 'Furnished', 'Pool', 'Microwave', 'Near Station', 'Beach View', 'Alarm', 'Garden'];

const FilterComponent: React.FC<FilterComponentProps> = ({ properties = [], onFilter }) => {
  const [category, setCategory] = useState('Immobilier');
  const [type, setType] = useState('Appartements');
  const [location, setLocation] = useState('Ariana');
  const [subLocation, setSubLocation] = useState('Ariana Essoughra');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [condition, setCondition] = useState('Neuf');
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prevState => ({
      ...prevState,
      [amenity]: !prevState[amenity],
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          type,
          location,
          subLocation,
          priceMin,
          priceMax,
          condition,
          amenities: Object.keys(selectedAmenities).filter(amenity => selectedAmenities[amenity])
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Que cherchez vous ?</Text>
      <TextInput
        placeholder="Ex: voiture, iPhone 12, t-..."
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Type"
        style={styles.input}
        value={type}
        onChangeText={setType}
      />
      <TextInput
        placeholder="Location"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="Sub-Location"
        style={styles.input}
        value={subLocation}
        onChangeText={setSubLocation}
      />
      <TextInput
        placeholder="Prix Min"
        style={styles.input}
        keyboardType="numeric"
        value={priceMin}
        onChangeText={setPriceMin}
      />
      <TextInput
        placeholder="Prix Max"
        style={styles.input}
        keyboardType="numeric"
        value={priceMax}
        onChangeText={setPriceMax}
      />
      <View style={styles.checkboxContainer}>
        <Text>Neuf</Text>
        <Switch
          value={condition === 'Neuf'}
          onValueChange={() => setCondition('Neuf')}
        />
        <Text>Occasion</Text>
        <Switch
          value={condition === 'Occasion'}
          onValueChange={() => setCondition('Occasion')}
        />
      </View>
      <Text style={styles.subtitle}>Amenities</Text>
      <View style={styles.amenitiesContainer}>
        {amenitiesList.map((amenity, index) => (
          <View key={index} style={styles.amenityItem}>
            <Text>{amenity}</Text>
            <Switch
              value={selectedAmenities[amenity] || false}
              onValueChange={() => toggleAmenity(amenity)}
            />
          </View>
        ))}
      </View>
      <Button title="Chercher" onPress={handleSearch} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginVertical: 5,
  },
});

export default FilterComponent;
