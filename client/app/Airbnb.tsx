// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { LeafletView, MapMarker, LatLng } from 'react-native-leaflet';

// const MapComponent: React.FC = () => {
//   const mapMarkers: MapMarker[] = [
//     {
//       position: {
//         lat: 51.505,
//         lng: -0.09,
//       },
//       icon: '❤️',
//       size: [32, 32],
//       popup: 'A pretty CSS3 popup.<br>Easily customizable.',
//     },
//   ];

//   const mapCenter: LatLng = {
//     lat: 51.505,
//     lng: -0.09,
//   };

//   return (
//     <View style={styles.container}>
//       <LeafletView
//         mapMarkers={mapMarkers}
//         mapCenterPosition={mapCenter}
//         zoom={13}
//         doDebug={false}
//         onMessage={(msg) => console.log(msg)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default MapComponent;