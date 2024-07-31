import React from "react";
import { View, ActivityIndicator, StyleSheet, Text, Animated } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  // Animation for the icon
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  // Interpolation for rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Icon name="home" size={80} color="#fff" />
      </Animated.View>
      <ActivityIndicator size="large" color="#fff" style={styles.activityIndicator} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center", // Center the content vertically
  },
  activityIndicator: {
    marginTop: 20,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loader;
