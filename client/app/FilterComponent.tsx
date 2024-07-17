// FilterComponent.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';

export interface Property {
  _id: string;
  address: string;
  size: number;
  category: string;
  location: string;
  condition: string;
  subLocation: string;
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

export interface FilterComponentProps {
  properties: Property[];
  onFilter: (filteredProperties: Property[]) => void;
  navigation: StackNavigationProp<RootStackParamList, 'FilterComponent'>; 
}


const categories = ['Select Category', '🏘️ Apartment', '🏘️ House', '🏘️ Office', '🏘️ Studio', '🏘️ Penthouse'];
export const tunisStates = [
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

export const subLocations: { [key: string]: string[] } = {
  "🗺️ Ariana": [
    "Ariana Essoughra",
    "Raoued",
    "Sokra",
    "Ariana Ville",
    "Ennasr",
  ],
  "🗺️ Beja": ["Beja Nord", "Beja Sud", "Nefza"],
  "🗺️ Ben Arous": ["Hammam Lif", "Radès", "Ben Arous Ville"],
  "🗺️ Bizerte": ["Bizerte Nord","Bizerte Sud","Menzel Bourguiba",],
  "🗺️ Gabes": ["Gabes Ville", "Gabes Sud", "Mareth", ],
  "🗺️ Gafsa": ["Gafsa Ville", "El Guettar", "Moulares", ],
  "🗺️ Jendouba": ["Jendouba Ville", "Bousalem",  "Fernana"],
  "🗺️ Kairouan": ["Kairouan Ville", "El Oueslatia", "Bouhajla",],
  "🗺️ Kasserine": ["Kasserine Ville", "Sbeitla", "Thala"],
  "🗺️ Kebili": ["Kebili Ville",  "Jemna", "Souk Lahad"],
  "🗺️ La Manouba": ["Manouba Ville", "Oued Ellil", "Douar Hicher"],
  "🗺️ Le Kef": ["Kef Ville", "Tajerouine", "Jerissa"],
  "🗺️ Mahdia": ["Mahdia Ville", "Ksour Essef", "Bou Merdes"],
  "🗺️ Medenine": ["Medenine Ville", "Houmt Souk",  "Beni Khedache"],
  "🗺️ Monastir": ["Monastir Ville", "Ksar Hellal", "Jemmal"],
  "🗺️ Nabeul": ["Nabeul Ville", "Hammamet", "Baraket essahel","Bir Chalouf",],
  "🗺️ Sfax": ["Sfax Ville", "Sakiet Ezzit",  "El Ain"],
  "🗺️ Sidi Bouzid": ["Sidi Bouzid Ville", "Regueb",  "Bir El Hafey"],
  "🗺️ Siliana": ["Siliana Ville", "Makthar", "Gaafour"],
  "🗺️ Sousse": ["Sousse Ville", "Hammam Sousse", "Kalaâ Kebira"],
  "🗺️ Tataouine": ["Tataouine Ville", "Dehiba", "Bir Lahmar"],
  "🗺️ Tozeur": ["Tozeur Ville", "Nefta",  "Tameghza"],
  "🗺️ Tunis": ["Tunis Ville", "Carthage", "La Marsa", "Le Bardo"],
  "🗺️ Zaghouan": ["Zaghouan Ville",  "Bir Mcherga", "Zriba"],
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
type FilterComponentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterComponent'>;

type Props = {
  navigation: FilterComponentScreenNavigationProp;
};

const FilterComponent: React.FC<FilterComponentProps> = ({ properties, onFilter, navigation }) => {
  const [category, setCategory] = useState('Select Category');
  const [location, setLocation] = useState('Select State');
  const [subLocation, setSubLocation] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);
  const [condition, setCondition] = useState('New');
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});
  const [operation, setOperation] = useState('sale');
  useEffect(() => {
    setSubLocation(''); 
  }, [location]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prevState => ({
      ...prevState,
      [amenity]: !prevState[amenity],
    }));
  };

  const handleSearch = () => {
    try {
      const filteredProperties = fetchFilteredData();
      onFilter(filteredProperties);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilteredData = (): Property[] => {
    const filteredProperties = properties.filter(property => {
      const meetsCategory = category === 'Select Category' || property.category === category;
      const meetsLocation = location === 'Select State' || property.location === location;
      const meetsSubLocation = !subLocation || property.subLocation === subLocation;
      const meetsPrice = (!priceMin || property.price >= priceMin) && (!priceMax || property.price <= priceMax);
      const meetsCondition = !condition || property.condition === condition;
      const meetsAmenities = Object.keys(selectedAmenities)
        .filter(amenity => selectedAmenities[amenity])
        .every(amenity => property.amenities.includes(amenity));
      const meetsOperation = !operation || property.operation === operation;

      return meetsCategory && meetsLocation && meetsSubLocation && meetsPrice && meetsCondition && meetsAmenities && meetsOperation;
    });

    return filteredProperties;
  };



  return (
    <ScrollView style={styles.container}>
      <Text>Filter Component</Text>
      {/*  UI components here */}
      <Button title="Search" onPress={handleSearch} />

      
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

      <Button title="Search" onPress={handleSearch} />
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
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  operationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRangeContainer: {
    marginBottom: 20,
  },
  priceRangeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRangeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  conditionText: {
    fontSize: 16,
  },
  amenitiesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 16,
  },
});

export default FilterComponent;