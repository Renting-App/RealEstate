import React, { useState, useEffect } from 'react';
import { Property } from './FilterComponent';
import FilterComponent from './FilterComponent';
import { Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';

type FilterComponentWrapperScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterComponentWrapper'>;
type FilterComponentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilterComponent'>;
type Props = {
  navigation: FilterComponentScreenNavigationProp;
};

const FilterComponentWrapper: React.FC<Props> = ({ navigation }) => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchAllProperties = async () => {
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
      }
    };

    fetchAllProperties();
  }, []);

  const handleFilter = (filteredProperties: Property[]) => {
    console.log('Filtered properties:', filteredProperties);
    navigation.navigate('FilteringData', { filteredProperties });
  };

  return (
    <FilterComponent
      properties={properties}
      onFilter={handleFilter}
      navigation={navigation}
    />
  );
};

export default FilterComponentWrapper;
