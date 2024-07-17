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
  location:
    | "Ariana"
    | "Beja"
    | "Ben Arous"
    | "Bizerte"
    | "Gabes"
    | "Gafsa"
    | "Jendouba"
    | "Kairouan"
    | "Kasserine"
    | "Kebili"
    | "La Manouba"
    | "Le Kef"
    | "Mahdia"
    | "Medenine"
    | "Monastir"
    | "Nabeul"
    | "Sfax"
    | "Sidi Bouzid"
    | "Siliana"
    | "Sousse"
    | "Tataouine"
    | "Tozeur"
    | "Tunis"
    | "Zaghouan";
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
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.address}
        onChangeText={(text) => handleInputChange("address", text)}
        placeholder="Enter address"
      />

      <Text style={styles.label}>Size (sqm):</Text>
      <TextInput
        style={styles.input}
        value={propertyData.size.toString()}
        onChangeText={(text) => handleInputChange("size", text)}
        placeholder="Enter size"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        style={styles.input}
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

      <Text style={styles.label}>Rooms:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.rooms.toString()}
        onChangeText={(text) => handleInputChange("rooms", text)}
        placeholder="Enter number of rooms"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bathrooms:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.bathrooms.toString()}
        onChangeText={(text) => handleInputChange("bathrooms", text)}
        placeholder="Enter number of bathrooms"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <Text style={styles.label}>Visit Dates:</Text>
      </TouchableOpacity>

      {showCalendar && (
        <Calendar
          current={new Date()}
          markedDates={getMarkedDates()}
          onDayPress={(day) => handleDayPress(day)}
        />
      )}

      <Text style={styles.label}>Contact Info:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.contact_info}
        onChangeText={(text) => handleInputChange("contact_info", text)}
        placeholder="Enter contact info"
      />

      <Text style={styles.label}>Date of Creation:</Text>
      <TextInput
        style={styles.input}
        value={propertyData.date_of_creation}
        onChangeText={(text) => handleInputChange("date_of_creation", text)}
        placeholder="Enter date of creation"
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
        style={styles.input}
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
        <Text style={styles.imagePickerButtonText}>Select Images</Text>
      </TouchableOpacity>

      <View style={styles.imagePreviewContainer}>
        {propertyData.images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.imagePreview}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenityButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 4,
  },
  amenityButtonActive: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  amenityText: {
    marginLeft: 4,
  },
  amenityTextActive: {
    color: "white",
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 10,
  },
  imagePickerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 4,
  },
});

export default PropertyForm;
