import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface AmenityButtonProps {
  amenity: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

const AmenityButton: React.FC<AmenityButtonProps> = ({
  amenity,
  icon,
  active,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.button, active && styles.buttonActive]}
    onPress={onPress}
  >
    <Icon name={icon} size={20} color={active ? "white" : "black"} />
    <Text style={[styles.text, active && styles.textActive]}>{amenity}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "48%",
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonActive: {
    backgroundColor: "#007bff",
  },
  text: {
    marginLeft: 8,
    color: "black",
  },
  textActive: {
    color: "white",
  },
});

export default AmenityButton;
