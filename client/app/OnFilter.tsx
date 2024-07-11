import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FilterComponent, { Property } from './FilterComponent'; // Ensure to import Property from the correct file

const YourParentComponent: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  const handleFilter = (filteredProperties: Property[]) => {
    setFilteredProperties(filteredProperties);
  };

  return (
    <View style={styles.container}>
      <FilterComponent onFilter={handleFilter} />
      {/* Render filtered properties */}
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.propertyContainer}>
            <Text>{item.title}</Text>
            <Text>{item.address}</Text>
            <Text>{item.price}</Text>
            {/* Render other property details */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  propertyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
});

export default YourParentComponent;
