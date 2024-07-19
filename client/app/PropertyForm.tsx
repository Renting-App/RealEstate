import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar, DateObject } from "react-native-calendars";
import { locations } from "./FilterComponent";

interface PropertyData {
  _id: string;
  address: string;
  size: number;
  category: "apartment" | "house" | "office" | "studio" | "penthouse";
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: "rent" | "sale";
  location: string;
  subLocation: string;
  date_of_creation: string;
  rooms: number;
  price: number;
  bathrooms: number;
  visits: {
    dates: string[];
  };
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
  status: "pending" | "approved" | "declined";
  notification: string;
  iduser: string;
  condition: "new" | "occasion";
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

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Post Your Property</Text>
        <Text style={styles.headerSubText}>
          Fill in the details below to add your property to our listings.
        </Text>
      </View>

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.address}
        onChangeText={(text) => handleInputChange("address", text)}
        placeholder="Enter address"
      />

      <Text style={styles.label}>Location:</Text>
      <Picker
        style={styles.picker}
        selectedValue={propertyData.location}
        onValueChange={(itemValue) => handleInputChange("location", itemValue)}
      >
        {Object.keys(locations).map((location, index) => (
          <Picker.Item key={index} label={location} value={location} />
        ))}
      </Picker>

      <Text style={styles.label}>Sub-location:</Text>
      <Picker
        style={styles.picker}
        selectedValue={propertyData.subLocation}
        onValueChange={(itemValue) =>
          handleInputChange("subLocation", itemValue)
        }
      >
        {propertyData.location &&
          locations[propertyData.location].map((subLocation, index) => (
            <Picker.Item key={index} label={subLocation} value={subLocation} />
          ))}
      </Picker>

      <Text style={styles.label}>Size (sq m):</Text>
      <TextInput
        style={styles.input}
        value={propertyData.size.toString()}
        onChangeText={(text) => handleInputChange("size", text)}
        placeholder="Enter size"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        style={styles.picker}
        selectedValue={propertyData.category}
        onValueChange={(itemValue) => handleInputChange("category", itemValue)}
      >
        <Picker.Item label="Apartment" value="apartment" />
        <Picker.Item label="House" value="house" />
        <Picker.Item label="Office" value="office" />
        <Picker.Item label="Studio" value="studio" />
        <Picker.Item label="Penthouse" value="penthouse" />
      </Picker>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.title}
        onChangeText={(text) => handleInputChange("title", text)}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={propertyData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.price.toString()}
        onChangeText={(text) => handleInputChange("price", text)}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Number of Rooms:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.rooms.toString()}
        onChangeText={(text) => handleInputChange("rooms", text)}
        placeholder="Enter number of rooms"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Number of Bathrooms:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.bathrooms.toString()}
        onChangeText={(text) => handleInputChange("bathrooms", text)}
        placeholder="Enter number of bathrooms"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Visit Dates:</Text>
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <Text style={styles.calendarLabel}>Select Dates</Text>
      </TouchableOpacity>
      {showCalendar && (
        <Calendar
          current={new Date()}
          markedDates={getMarkedDates()}
          onDayPress={(day) => handleDayPress(day)}
          style={styles.calendar}
        />
      )}

      <Text style={styles.label}>Contact Info:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.contact_info}
        onChangeText={(text) => handleInputChange("contact_info", text)}
        placeholder="Enter contact info"
      />

      <Text style={styles.label}>Status:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.status}
        onChangeText={(text) => handleInputChange("status", text)}
        placeholder="Enter status"
      />

      <Text style={styles.label}>Operation:</Text>
      <Picker
        style={styles.picker}
        selectedValue={propertyData.operation}
        onValueChange={(itemValue) => handleInputChange("operation", itemValue)}
      >
        <Picker.Item label="Rent" value="rent" />
        <Picker.Item label="Sell" value="sale" />
      </Picker>

      <Text style={styles.label}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
        {Object.keys(amenityIcons).map((amenity) => (
          <TouchableOpacity
            key={amenity}
            style={[
              styles.amenityButton,
              propertyData.amenities[
                amenity as keyof typeof propertyData.amenities
              ]
                ? styles.amenityButtonActive
                : {},
            ]}
            onPress={() =>
              toggleCheckbox(amenity as keyof typeof propertyData.amenities)
            }
          >
            <Icon
              name={amenityIcons[amenity]}
              size={20}
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
                ]
                  ? styles.amenityTextActive
                  : {},
              ]}
            >
              {amenity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleImageSelection}
      >
        <Text style={styles.buttonText}>Pick Images</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {propertyData.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubText: {
    fontSize: 16,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    textAlignVertical: "top",
    height: 120,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  calendarLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
  },
  calendar: {
    marginBottom: 16,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  amenityButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  amenityButtonActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  amenityText: {
    fontSize: 14,
    marginLeft: 8,
    color: "#333",
  },
  amenityTextActive: {
    color: "#fff",
  },
  imagePickerButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 8,
  },
});

export default PropertyForm;
