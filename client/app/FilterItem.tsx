import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

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

const categories = ['Select Category', ' 🏘️Apartment', '🏘️House', '🏘️Residence'];
const tunisStates = [
  // 'Select State',
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

const FilterComponent: React.FC<FilterComponentProps> = ({ properties = [], onFilter }) => {
  const [category, setCategory] = useState('Select Category');
  const [type, setType] = useState('Appartements');
  const [location, setLocation] = useState('Select State');
  const [subLocation, setSubLocation] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);
  const [condition, setCondition] = useState('Neuf');
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});

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
      {location !== 'Select State' && subLocations[location] && (
        <Picker
          selectedValue={subLocation}
          onValueChange={(itemValue) => setSubLocation(itemValue)}
          style={styles.input}
        >
          {subLocations[location].map((sub, index) => (
            <Picker.Item key={index} label={sub} value={sub} />
          ))}
        </Picker>
      )}
      <Text style={styles.subtitle}>Price</Text>
      <View style={styles.priceContainer}>
        <Text>Min: {priceMin}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000000}
          step={1000}
          value={priceMin}
          onValueChange={(value) => setPriceMin(value)}
        />
        <Text>Max: {priceMax}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000000}
          step={1000}
          value={priceMax}
          onValueChange={(value) => setPriceMax(value)}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <Text>New</Text>
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
      <Button title="Find your sweet home" onPress={handleSearch} />
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
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  priceContainer: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
