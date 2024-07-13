import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export interface Property {
  _id: string;
  address: string;
  size: number;
  category: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  operation: string; // Updated to include operation
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

const categories = ['Select Category', '🏘️ Apartment', '🏘️ House', '🏘️ Office', '🏘️ Studio', '🏘️ Penthouse'];
const tunisStates = [
  '🗺️ Ariana',
  '🗺️ Beja',
  '🗺️ Ben Arous',
  '🗺️ Bizerte',
  '🗺️ Gabes',
  '🗺️ Gafsa',
  '🗺️ Jendouba',
  '🗺️ Kairouan',
  '🗺️ Kasserine',
  '🗺️ Kebili',
  '🗺️ La Manouba',
  '🗺️ Le Kef',
  '🗺️ Mahdia',
  '🗺️ Medenine',
  '🗺️ Monastir',
  '🗺️ Nabeul',
  '🗺️ Sfax',
  '🗺️ Sidi Bouzid',
  '🗺️ Siliana',
  '🗺️ Sousse',
  '🗺️ Tataouine',
  '🗺️ Tozeur',
  '🗺️ Tunis',
  '🗺️ Zaghouan',
];

const subLocations: { [key: string]: string[] } = {
  '🗺️ Ariana': ['Ariana Essoughra', 'Raoued', 'Sokra', 'Ariana Ville', 'Ennasr'],
  '🗺️ Beja': ['Beja Nord', 'Beja Sud', 'Nefza', 'Teboursouk'],
  '🗺️ Ben Arous': ['Hammam Lif', 'Radès', 'Ben Arous Ville', 'Ezzahra'],
  '🗺️ Bizerte': ['Bizerte Nord', 'Bizerte Sud', 'Menzel Jemil', 'Menzel Bourguiba'],
  '🗺️ Gabes': ['Gabes Ville', 'Gabes Sud', 'Mareth', 'Metouia'],
  '🗺️ Gafsa': ['Gafsa Ville', 'El Guettar', 'Moulares', 'Metlaoui'],
  '🗺️ Jendouba': ['Jendouba Ville', 'Bousalem', 'Tabarka', 'Fernana'],
  '🗺️ Kairouan': ['Kairouan Ville', 'El Oueslatia', 'Bouhajla', 'Sbikha'],
  '🗺️ Kasserine': ['Kasserine Ville', 'Sbeitla', 'Thala', 'Foussana'],
  '🗺️ Kebili': ['Kebili Ville', 'Douz', 'Jemna', 'Souk Lahad'],
  '🗺️ La Manouba': ['Manouba Ville', 'Oued Ellil', 'Douar Hicher', 'Tebourba'],
  '🗺️ Le Kef': ['Kef Ville', 'Tajerouine', 'Jerissa', 'Dahmani'],
  '🗺️ Mahdia': ['Mahdia Ville', 'Chebba', 'Ksour Essef', 'Bou Merdes'],
  '🗺️ Medenine': ['Medenine Ville', 'Houmt Souk', 'Zarzis', 'Beni Khedache'],
  '🗺️ Monastir': ['Monastir Ville', 'Skanes', 'Ksar Hellal', 'Jemmal'],
  '🗺️ Nabeul': ['Nabeul Ville', 'Hammamet', 'Korba', 'Kelibia'],
  '🗺️ Sfax': ['Sfax Ville', 'Sakiet Ezzit', 'Thyna', 'El Ain'],
  '🗺️ Sidi Bouzid': ['Sidi Bouzid Ville', 'Regueb', 'Meknassy', 'Bir El Hafey'],
  '🗺️ Siliana': ['Siliana Ville', 'Le Krib', 'Makthar', 'Gaafour'],
  '🗺️ Sousse': ['Sousse Ville', 'Akouda', 'Hammam Sousse', 'Kalaâ Kebira'],
  '🗺️ Tataouine': ['Tataouine Ville', 'Remada', 'Dehiba', 'Bir Lahmar'],
  '🗺️ Tozeur': ['Tozeur Ville', 'Nefta', 'Degache', 'Tameghza'],
  '🗺️ Tunis': ['Tunis Ville', 'Carthage', 'La Marsa', 'Le Bardo'],
  '🗺️ Zaghouan': ['Zaghouan Ville', 'Nadhour', 'Bir Mcherga', 'Zriba']
};

const amenitiesList = [
  'Parking',
  'AC',
  'Furnished',
  'Pool',
  'Microwave',
  'Near Station',
  'Beach View',
  'Alarm',
  'Garden',
];

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilter }) => {
  const [category, setCategory] = useState('Select Category');
  const [location, setLocation] = useState('Select State');
  const [subLocation, setSubLocation] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);
  const [condition, setCondition] = useState('New');
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});
  const [operation, setOperation] = useState('sale'); // Default to 'sale'

  useEffect(() => {
    setSubLocation(''); // Reset sub-location when location changes
  }, [location]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prevState => ({
      ...prevState,
      [amenity]: !prevState[amenity],
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          location,
          subLocation,
          priceMin,
          priceMax,
          condition,
          amenities: Object.keys(selectedAmenities).filter(amenity => selectedAmenities[amenity]),
          operation,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const filteredData: Property[] = await fetchFilteredData(); // Implement your filtering logic here
      onFilter(filteredData); // Call onFilter with filtered data
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilteredData = async (): Promise<Property[]> => {
    // Implement your filtering logic here (e.g., fetch from API or filter local data)
    // Example:
    const filteredProperties: Property[] = []; // Implement filtering logic
    return filteredProperties;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Looking for... </Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.input}
      >
        {categories.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>

      {category === '🏘️ Apartment' && (
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select a type" value="Appartements" />

        </Picker>
      )}

      <Picker
        selectedValue={location}
        onValueChange={(itemValue) => setLocation(itemValue)}
        style={styles.input}
      >
        {tunisStates.map((state, index) => (
          <Picker.Item key={index} label={state} value={state} />
        ))}
      </Picker>







      {subLocations[location] && (
        <Picker
          selectedValue={subLocation}
          onValueChange={(itemValue) => setSubLocation(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Select Sub-Location" value="" />
          {subLocations[location].map((subLoc, index) => (
            <Picker.Item key={index} label={subLoc} value={subLoc} />
          ))}
        </Picker>
      )}


{/* Operation (Rent or Sale) Selection */}
<Text style={styles.operationLabel}>Operation:</Text>
      <Picker
        selectedValue={operation}
        onValueChange={(itemValue) => setOperation(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Sale" value="sale" />
        <Picker.Item label="Rent" value="rent" />
      </Picker>

      <View style={styles.priceRangeContainer}>
        <Text style={styles.priceRangeLabel}>Price Range:</Text>
        <Text style={styles.priceRangeText}>${priceMin} - ${priceMax}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1000000}
        step={10000}
        minimumTrackTintColor="#1EB980"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1EB980"
        value={priceMin}
        onValueChange={(value) => setPriceMin(value)}
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1000000}
        step={10000}
        minimumTrackTintColor="#1EB980"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1EB980"
        value={priceMax}
        onValueChange={(value) => setPriceMax(value)}
      />

      <Text style={styles.conditionLabel}>Condition:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.conditionText}>New</Text>
        <Switch
          value={condition === 'New'}
          onValueChange={() => setCondition(condition === 'New' ? 'Occasion' : 'New')}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
        <Text style={styles.conditionText}>Occasion</Text>
      </View>

      <Text style={styles.amenitiesLabel}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
        {amenitiesList.map((amenity, index) => (
          <View key={index} style={styles.amenityItem}>
            <Text style={styles.amenityText}>{amenity}</Text>
            <Switch
              value={selectedAmenities[amenity] || false}
              onValueChange={() => toggleAmenity(amenity)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        ))}
      </View>

      

      <Button
        title="Find Your Sweet Home"
        onPress={handleSearch}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceRangeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceRangeText: {
    fontSize: 16,
  },
  slider: {
    height: 40,
    width: '100%',
    marginBottom: 20,
  },
  conditionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  conditionText: {
    fontSize: 16,
    marginRight: 30,
    marginLeft: 30,
  },
  amenitiesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 16,
    marginRight: 10,
  },
  operationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FilterComponent;
