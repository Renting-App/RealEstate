import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
          onDayPress={(day: any) => handleDayPress(day)}
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
              ] && styles.amenityButtonSelected,
            ]}
            onPress={() =>
              toggleCheckbox(amenity as keyof typeof propertyData.amenities)
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
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubText: {
    fontSize: 16,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  calendarLabel: {
    color: "#007bff",
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
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  amenityButtonSelected: {
    backgroundColor: "#007bff",
  },
  amenityText: {
    marginTop: 5,
    textAlign: "center",
  },
  amenityTextSelected: {
    color: "white",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PropertyForm;
