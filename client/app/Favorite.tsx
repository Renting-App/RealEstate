import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';

const Favorite: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const renderFavoriteItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <TouchableOpacity onPress={() => removeFromFavorites(item._id)}>
            <Text style={styles.removeButton}>Remove from Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderFavoriteItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 80,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  removeButton: {
    color: '#ff0000',
    marginTop: 8,
  },
});

export default Favorite;
