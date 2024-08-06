import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const RefreshButton: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onRefresh}>
      <Ionicons name="refresh" size={24} color="white" />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default RefreshButton;