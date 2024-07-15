import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerFieldProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string }[];
}

const PickerField: React.FC<PickerFieldProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Picker
      style={styles.input}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default PickerField;
