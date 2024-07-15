import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ImagePickerButtonProps {
  onPress: () => void;
}

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Select Images</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ImagePickerButton;
