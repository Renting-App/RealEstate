import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, CalendarDate } from "react-native-calendars";

interface CalendarFieldProps {
  selectedDates: string[];
  onDateSelect: (dates: string[]) => void;
}

const CalendarField: React.FC<CalendarFieldProps> = ({
  selectedDates,
  onDateSelect,
}) => {
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility

  const handleDayPress = (day: CalendarDate) => {
    const date = day.dateString;
    const isSelected = selectedDates.includes(date);

    if (isSelected) {
      onDateSelect(selectedDates.filter((d) => d !== date));
    } else {
      onDateSelect([...selectedDates, date]);
    }
  };

  const getMarkedDates = () => {
    const markedDates: { [date: string]: { selected: boolean } } = {};
    selectedDates.forEach((date) => {
      markedDates[date] = { selected: true };
    });
    return markedDates;
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
        <Text style={styles.toggleButton}>Select Visit Dates</Text>
      </TouchableOpacity>
      {showCalendar && (
        <Calendar onDayPress={handleDayPress} markedDates={getMarkedDates()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CalendarField;
