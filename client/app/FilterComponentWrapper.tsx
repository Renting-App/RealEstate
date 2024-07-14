import React, { useState, useEffect } from 'react';
import { Property, FilterComponentProps } from './FilterComponent';
import FilterComponent from './FilterComponent';
import {Text} from 'react-native';


const FilterComponentWrapper: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchAllProperties = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:5000/api/gethouse', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data: Property[] = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchAllProperties();
  }, []);

  const handleFilter = (filteredProperties: Property[]) => {
    console.log('Filtered properties:', filteredProperties);
    // You can perform additional actions here with the filtered properties
  };

  if (loading) {
    return <Text>Loading...</Text>; // Add a loading state
  }

  return (
    <FilterComponent
      properties={properties}
      onFilter={handleFilter}
      navigation={navigation}
    />
  );
};

export default FilterComponentWrapper;
