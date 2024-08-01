import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../constants/types';

type FavoriteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PropertyDetails'
>;

const Favorite: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  const renderFavoriteItem = ({ item }: { item: any }) => {
    const handleImagePress = () => {
      navigation.navigate('PropertyDetails', { residence: JSON.stringify(item) });
    };

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: item.images[0] }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <TouchableOpacity onPress={() => removeFromFavorites(item._id)}>
            <Text style={styles.removeButton}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Image
          source={require('../assets/images/fav.png')}
          style={styles.noFavoritesImage}
        />
        <Text style={styles.noFavoritesMessage}>You have no favorites yet</Text>
        <Text style={styles.noFavoritesDescription}>
          Start adding properties to your favorites list by tapping the heart icon on any property.
        </Text>
      </View>
    );
  }

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
    backgroundColor: '#F4F4F4',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    color: '#009688',
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 8,
  },
  removeButton: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: '600',
  },
  noFavoritesContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F4F4',
    
  },
  noFavoritesImage: {
    width: 200,
    height: 400,
    marginBottom: 20,
  },
  noFavoritesMessage: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  noFavoritesDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Favorite;
