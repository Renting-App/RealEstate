import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar } from "react-native-calendars";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { locations } from "./FilterComponent";

type DateObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

interface PropertyData {
  address: string;
  size: number;
  category: "apartment" | "house" | "office" | "studio" | "penthouse" | string;
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: "rent" | "sale" | string;
  location: string;
  subLocation: string;
  date_of_creation: string;
  rooms: number;
  price: number;
  bathrooms: number;
  visits: string[];
  amenities: {
    parking: boolean;
    ac: boolean;
    furnished: boolean;
    pool: boolean;
    microwave: boolean;
    near_subway: boolean;
    beach_view: boolean;
    alarm: boolean;
    garden: boolean;
  };
  contact_info: string;
  status: "pending" | "approved" | "declined" | string;
  notification: string;
  iduser: string;
  condition: "new" | "occasion" | string;
  map?: any;
}

interface PropertyFormProps {
  propertyData: PropertyData;
  handleInputChange: (
    name: keyof PropertyData,
    value: string | boolean
  ) => void;
  toggleCheckbox: (name: keyof PropertyData["amenities"]) => void;
  handleImageSelection: () => void;
  getMarkedDates: () => { [date: string]: { selected: boolean } };
  handleDayPress: (day: DateObject) => void;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  handleQueryChange: (text: string) => void;
  handleSuggestionSelect: (suggestion: any) => void;
  suggestions: any[];
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
  handleSubmit: () => void;
  handleMapPress: (event: any) => void;
  handleUseCurrentLocation: () => void;
  map: { latitude: number; longitude: number } | null;
  mapRef: React.RefObject<MapView>;
  loading: boolean;
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  propertyData,
  handleInputChange,
  toggleCheckbox,
  handleImageSelection,
  getMarkedDates,
  handleDayPress,
  showCalendar,
  setShowCalendar,
  handleQueryChange,
  handleSuggestionSelect,
  suggestions,
  setSuggestions,
  handleSubmit,
  handleMapPress,
  handleUseCurrentLocation,
  map,
  mapRef,
  loading,
  showMap,
  setShowMap,
}) => {
  const amenityIcons: { [key: string]: string } = {
    parking: "car",
    ac: "snowflake-o",
    furnished: "bed",
    pool: "tint",
    microwave: "cutlery",
    near_subway: "subway",
    beach_view: "umbrella",
    alarm: "bell",
    garden: "tree",
  };
  const adminFee = (parseFloat(propertyData.price.toString()) * 0.1).toFixed(2);

  const renderItem = ({ item }: { item: string }) => {
    switch (item) {
      case "header":
        return (
          <View style={styles.header}>
            <Text style={styles.headerText}>Post Your Property</Text>
            <Text style={styles.headerSubText}>
              Fill in the details below to add your property to our listings.
            </Text>
          </View>
        );
      case "basicInfo":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="info-circle" size={20} color="black" /> Basic Info
            </Text>
            <View style={styles.inputContainer}>
              <Icon name="pencil" size={20} color="black" />
              <TextInput
                style={styles.input}
                value={propertyData.title}
                onChangeText={(text) => handleInputChange("title", text)}
                placeholder="Enter title"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="align-left" size={20} color="black" />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={propertyData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                placeholder="Enter description"
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="dollar" size={20} color="black" />
              <TextInput
                style={styles.input}
                value={propertyData.price.toString()}
                onChangeText={(text) => handleInputChange("price", text)}
                placeholder="Enter price"
                keyboardType="numeric"
              />
            </View>
           
          </View>
        );
      case "details":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="list" size={20} color="black" /> Details
            </Text>
            <Text style={styles.label}>Address:</Text>
            <View style={styles.inputContainer}>
              <Icon name="map-marker" size={20} color="black" />
              <TextInput
                style={styles.input}
                value={propertyData.address}
                onChangeText={(text) => {
                  handleQueryChange(text);
                  if (text.length === 0) {
                    setSuggestions([]);
                  }
                }}
                placeholder="Enter address"
              />
            </View>
            <Text style={styles.mapLink} onPress={() => setShowMap(true)}>
              <Icon name="map" size={20} color="black" /> Or select from the
              map
            </Text>
            {showMap && (
              <View style={styles.mapContainer}>
                <MapView
                  ref={mapRef}
                  style={styles.map}
                  onPress={handleMapPress}
                  initialRegion={{
                    latitude: 33.8869,
                    longitude: 9.5375,
                    latitudeDelta: 5,
                    longitudeDelta: 5,
                  }}
                >
                  {map && <Marker coordinate={map} title="Property Location" />}
                </MapView>
                <TouchableOpacity
                  style={styles.locationButton}
                  onPress={handleUseCurrentLocation}
                >
                  <Ionicons name="locate" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
                  <Text style={styles.itemText}>{item.place_name}</Text>
                </TouchableOpacity>
              )}
            />
            <Text style={styles.label}>Location:</Text>
            <View style={styles.inputContainer}>
              <Icon name="location-arrow" size={20} color="black" />
              <Picker
                style={styles.picker}
                selectedValue={propertyData.location}
                onValueChange={(itemValue) => {
                  handleInputChange("location", itemValue);
                  handleInputChange(
                    "address",
                    `${itemValue}, ${propertyData.subLocation}`
                  );
                }}
              >
                {Object.keys(locations).map((location, index) => (
                  <Picker.Item key={index} label={location} value={location} />
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Sub-location:</Text>
            <View style={styles.inputContainer}>
              <Icon name="location-arrow" size={20} color="black" />
              <Picker
                style={styles.picker}
                selectedValue={propertyData.subLocation}
                onValueChange={(itemValue) => {
                  handleInputChange("subLocation", itemValue);
                  handleInputChange(
                    "address",
                    `${propertyData.location}, ${itemValue}`
                  );
                }}
              >
                {propertyData.location &&
                  locations[propertyData.location].map((subLocation, index) => (
                    <Picker.Item
                      key={index}
                      label={subLocation}
                      value={subLocation}
                    />
                  ))}
              </Picker>
            </View>
            <Text style={styles.label}>Size (m²):</Text>
            <View style={styles.inputContainer}>
              <Icon name="arrows-alt" size={20} color="black" />
              <TextInput
                style={styles.input}
                value={propertyData.size.toString()}
                onChangeText={(text) => handleInputChange("size", text)}
                placeholder="Enter size"
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.label}>Category:</Text>
            <View style={styles.inputContainer}>
              <Icon name="building" size={20} color="black" />
              <Picker
                style={styles.picker}
                selectedValue={propertyData.category}
                onValueChange={(itemValue) =>
                  handleInputChange("category", itemValue)
                }
              >
                <Picker.Item label="Apartment" value="apartment" />
                <Picker.Item label="House" value="house" />
                <Picker.Item label="Office" value="office" />
                <Picker.Item label="Studio" value="studio" />
                <Picker.Item label="Penthouse" value="penthouse" />
              </Picker>
            </View>
            <Text style={styles.label}>Number of Rooms:</Text>
            <View style={styles.inputContainer}>
              <Icon name="bed" size={20} color="black" />
              <TextInput
                style={styles.input}
                value={propertyData.rooms.toString()}
                onChangeText={(text) => handleInputChange("rooms", text)}
                placeholder="Enter number of rooms"
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.label}>Number of Bathrooms:</Text>
            <View style={styles.inputContainer}>
              <Icon name="bath" size={20} color="black" />
              <TextInput
                style={styles.input}
                value={propertyData.bathrooms.toString()}
                onChangeText={(text) => handleInputChange("bathrooms", text)}
                placeholder="Enter number of bathrooms"
                keyboardType="numeric"
              />
            </View>
          </View>
        );
      case "visitDates":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="calendar" size={20} color="black" /> Visit Dates
            </Text>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Text style={styles.calendarLabel}>Select Dates</Text>
            </TouchableOpacity>
            {showCalendar && (
              <Calendar
                current={new Date()}
                markedDates={getMarkedDates()}
                onDayPress={(day: any) => handleDayPress(day)}
                style={styles.calendar}
              />
            )}
          </View>
        );
      case "amenities":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="check-square-o" size={20} color="black" /> Amenities
            </Text>
            <View style={styles.amenitiesContainer}>
              {Object.keys(amenityIcons).map((amenity) => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityButton,
                    propertyData.amenities[
                      amenity as keyof typeof propertyData.amenities
                    ] && styles.amenityButtonSelected,
                  ]}
                  onPress={() =>
                    toggleCheckbox(
                      amenity as keyof typeof propertyData.amenities
                    )
                  }
                >
                  <Icon
                    name={amenityIcons[amenity]}
                    size={24}
                    color={
                      propertyData.amenities[
                        amenity as keyof typeof propertyData.amenities
                      ]
                        ? "white"
                        : "black"
                    }
                  />
                  <Text
                    style={[
                      styles.amenityText,
                      propertyData.amenities[
                        amenity as keyof typeof propertyData.amenities
                      ] && styles.amenityTextSelected,
                    ]}
                  >
                    {amenity.replace("_", " ")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case "images":
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Icon name="camera" size={20} color="black" /> Images
            </Text>
            <TouchableOpacity onPress={handleImageSelection}>
              <Text style={styles.imageButton}>
                <Icon name="upload" size={20} color="black" /> Upload Images
              </Text>
            </TouchableOpacity>
            {propertyData.images.length > 0 && (
              <View style={styles.imageContainer}>
                {propertyData.images.map((image, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: image }} style={styles.image} />
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      case "submit":
        return loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              <Icon name="send" size={20} color="#fff" /> Post Property
            </Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={[
        "header",
        "basicInfo",
        "details",
        "visitDates",
        "amenities",
        "images",
        "submit",
      ]}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.scrollViewContainer}
    />
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
   
    paddingBottom: 20,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF", // White background for the form
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000080", // Dark green header text color
  },
  headerSubText: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000080", // Dark green section title color
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000080", // Dark green label color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#000080", // Dark green border color
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF", // White background for input container
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFFFFF", // White background for inputs
  },
  textArea: {
    height: 100,
  },
  picker: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background for picker
  },
  calendarLabel: {
    color: "#000080", // Dark green calendar label color
    fontSize: 16,
    textDecorationLine: "underline",
    marginBottom: 15,
  },
  calendar: {
    marginBottom: 15,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amenityButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000080", // Dark green border color for amenity buttons
    borderRadius: 5,
    marginBottom: 10,
  },
  amenityButtonSelected: {
    backgroundColor: "#000080", // Dark green background for selected amenities
  },
  amenityText: {
    marginTop: 5,
    textAlign: "center",
  },
  amenityTextSelected: {
    color: "#FFFFFF", // White text color for selected amenities
  },
  imageButton: {
    color: "#000080", // Dark green text color for image button
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  mapLink: {
    color: "#000080", // Dark green map link color
    fontSize: 16,
    textDecorationLine: "underline",
    marginVertical: 10,
  },
  mapContainer: {
    position: "relative",
    marginBottom: 20,
  },
  map: {
    height: 300,
  },
  locationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000080", // Dark green background for location button
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  submitButton: {
    backgroundColor: "#000080", // Dark green background for submit button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF", // White text color for submit button
    fontSize: 16,
    fontWeight: "bold",
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000080", // Dark green border color for item text
  },
});

export default PropertyForm;