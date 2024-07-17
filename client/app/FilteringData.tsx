import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import { Property } from './FilterComponent';

type FilteringDataRouteProp = RouteProp<RootStackParamList, 'FilteringData'>;
type FilteringDataNavigationProp = StackNavigationProp<RootStackParamList, 'FilteringData'>;

type Props = {
  route: FilteringDataRouteProp;
  navigation: FilteringDataNavigationProp;
};

const FilteringData: React.FC<Props> = ({ route }) => {
  const { filteredProperties } = route.params;

  const renderItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.address}</Text>
      <Text>{item.price} USD</Text>
      {/* Render other property details as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProperties}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  propertyContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default FilteringData;
