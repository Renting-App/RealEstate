import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const places = [
  {
    title: 'house',
    description: 'in the heart of Tunis',
    latitude: 36.8065,
    longitude: 10.1815,
  },
  {
    title: 'Apartment',
    description: 'available for summer vacation',
    latitude: 35.8256,
    longitude: 10.636,
  },
  {
    title: 'studio',
    description: 'for annual rent',
    latitude: 34.7406,
    longitude: 10.7603,
  },
  {
    title: 'penthouse',
    description: 'in a fancy neighborhood',
    latitude: 36.858,
    longitude: 10.3308,
  },
  {
    title: 'house',
    description: 'near popular tourist destinations',
    latitude: 36.4041,
    longitude: 10.622,
  },
  {
    title: 'villa',
    description: 'luxurious villa with private pool',
    latitude: 37.2785,
    longitude: 9.8739,
  },
  {
    title: 'cottage',
    description: 'cozy cottage in the countryside',
    latitude: 35.6786,
    longitude: 10.0963,
  },
  {
    title: 'bungalow',
    description: 'beachside bungalow with ocean views',
    latitude: 33.8869,
    longitude: 10.1096,
  },
  {
    title: 'loft',
    description: 'modern loft in city center',
    latitude: 36.8188,
    longitude: 10.1658,
  },
  {
    title: 'duplex',
    description: 'spacious duplex with rooftop terrace',
    latitude: 35.7159,
    longitude: 10.6605,
  },
  {
    title: 'townhouse',
    description: 'elegant townhouse in historic district',
    latitude: 36.8061,
    longitude: 10.1818,
  },
  {
    title: 'condo',
    description: 'contemporary condo with city views',
    latitude: 35.6769,
    longitude: 10.1005,
  },
  {
    title: 'cabin',
    description: 'rustic cabin in the mountains',
    latitude: 36.2535,
    longitude: 9.8644,
  },
  {
    title: 'farmhouse',
    description: 'charming farmhouse with large garden',
    latitude: 35.7555,
    longitude: 10.5869,
  },
  {
    title: 'mansion',
    description: 'grand mansion with luxurious amenities',
    latitude: 36.8028,
    longitude: 10.1805,
  },
];

  // Add more places as needed


const Maps = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.8869,
          longitude: 9.5375,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.title}
            description={place.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '65%',
  },
});

export default Maps;
