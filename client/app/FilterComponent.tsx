import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./_layout";

type FilterComponentProps = {
  navigation: StackNavigationProp<RootStackParamList, "FilterComponent">;
};

const amenitiesList = [
  { label: "AC", value: "ac" },
  { label: "Pool", value: "pool" },
  { label: "Alarm", value: "alarm" },
  { label: "Garden", value: "garden" },
  { label: "Parking", value: "parking" },
  { label: "Furnished", value: "furnished" },
  { label: "Microwave", value: "microwave" },
  { label: "Beach View", value: "beach_view" },
  { label: "Near Subway", value: "near_subway" },
];

export const locations: { [key: string]: string[] } = {
  Ariana: ["Ariana Essoughra", "Raoued", "Sokra", "Ariana Ville", "Ennasr"],
  Beja: ["Beja Nord", "Beja Sud", "Nefza", "Teboursouk"],
  "Ben Arous": ["Hammam Lif", "Radès", "Ben Arous Ville", "Ezzahra"],
  Bizerte: ["Bizerte Nord", "Bizerte Sud", "Menzel Jemil", "Menzel Bourguiba"],
  Gabes: ["Gabes Ville", "Gabes Sud", "Mareth", "Metouia"],
  Gafsa: ["Gafsa Ville", "El Guettar", "Moulares", "Metlaoui"],
  Jendouba: ["Jendouba Ville", "Bousalem", "Tabarka", "Fernana"],
  Kairouan: ["Kairouan Ville", "El Oueslatia", "Bouhajla", "Sbikha"],
  Kasserine: ["Kasserine Ville", "Sbeitla", "Thala", "Foussana"],
  Kebili: ["Kebili Ville", "Douz", "Jemna", "Souk Lahad"],
  Manouba: ["Manouba Ville", "Oued Ellil", "Douar Hicher", "Tebourba"],
  Kef: ["Kef Ville", "Tajerouine", "Jerissa", "Dahmani"],
  Mahdia: ["Mahdia Ville", "Chebba", "Ksour Essef", "Bou Merdes"],
  Medenine: ["Medenine Ville", "Houmt Souk", "Zarzis", "Beni Khedache"],
  Monastir: ["Monastir Ville", "Skanes", "Ksar Hellal", "Jemmal"],
  Nabeul: ["Nabeul Ville", "Hammamet", "Korba", "Baraket essahel", "Kelibia"],
  Sfax: ["Sfax Ville", "Sakiet Ezzit", "Thyna", "El Ain"],
  "Sidi Bouzid": ["Sidi Bouzid Ville", "Regueb", "Meknassy", "Bir El Hafey"],
  Siliana: ["Siliana Ville", "Le Krib", "Makthar", "Gaafour"],
  Sousse: ["Sousse Ville", "Akouda", "Hammam Sousse", "Kalaâ Kebira"],
  Tataouine: ["Tataouine Ville", "Remada", "Dehiba", "Bir Lahmar"],
  Tozeur: ["Tozeur Ville", "Nefta", "Degache", "Tameghza"],
  Tunis: ["Tunis Ville", "Carthage", "La Marsa", "Le Bardo"],
  Zaghouan: ["Zaghouan Ville", "Nadhour", "Bir Mcherga", "Zriba"],
};

const FilterComponent: React.FC<FilterComponentProps> = ({ navigation }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const [operation, setOperation] = useState("");
  const [priceMin, setpriceMin] = useState("");
  const [priceMax, setpriceMax] = useState("");

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleLocationChange = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setSubLocation("");
  };

  const handleAmenityChange = (amenity: string) => {
    const isSelected = selectedAmenities.includes(amenity.value);
    if (isSelected) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = () => {
    const criteria = {
      category,
      location,
      subLocation,
      operation,
      priceMin,
      priceMax,
      amenities: selectedAmenities,
    };
    console.log(criteria);
    navigation.navigate("FilteredDataComponent", { criteria });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue.toString())}
        style={styles.picker}
      >
        <Picker.Item label="Select category" value="" />
        <Picker.Item label="House" value="house" />
        <Picker.Item label="Apartment" value="apartment" />
        <Picker.Item label="Studio" value="studio" />
        <Picker.Item label="Penthouse" value="penthouse" />
      </Picker>

      <Text style={styles.label}>Location</Text>
      <Picker
        selectedValue={location}
        onValueChange={(itemValue) =>
          handleLocationChange(itemValue.toString())
        }
        style={styles.picker}
      >
        <Picker.Item label="Select location" value="" />
        {Object.keys(locations).map((loc) => (
          <Picker.Item key={loc} label={loc} value={loc} />
        ))}
      </Picker>

      {location && (
        <>
          <Text style={styles.label}>Sub-location</Text>
          <Picker
            selectedValue={subLocation}
            onValueChange={(itemValue) => setSubLocation(itemValue.toString())}
            style={styles.picker}
          >
            <Picker.Item label="Select sub-location" value="" />
            {locations[location].map((subLoc) => (
              <Picker.Item key={subLoc} label={subLoc} value={subLoc} />
            ))}
          </Picker>
        </>
      )}

      <Text style={styles.label}>Operation</Text>
      <Picker
        selectedValue={operation}
        onValueChange={(itemValue) => setOperation(itemValue.toString())}
        style={styles.picker}
      >
        <Picker.Item label="Select operation" value="" />
        <Picker.Item label="Rent" value="rent" />
        <Picker.Item label="Sale" value="sale" />
      </Picker>

      <Text style={styles.label}>Price Min</Text>
      <TextInput
        value={priceMin}
        onChangeText={setpriceMin}
        placeholder="Enter min price"
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Price Max</Text>
      <TextInput
        value={priceMax}
        onChangeText={setpriceMax}
        placeholder="Enter max price"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Amenities</Text>
      {amenitiesList.map((amenity) => (
        <View key={amenity.value} style={styles.checkboxContainer}>
          <CheckBox
            checked={selectedAmenities.includes(amenity.value)}
            onPress={() => handleAmenityChange(amenity.value)}
            containerStyle={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>{amenity.label}</Text>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  picker: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    margin: 0,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginVertical: 30,
    marginHorizontal: 40,
  },
});

export default FilterComponent;
