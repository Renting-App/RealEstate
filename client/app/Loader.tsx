import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "flex-end", // Align at the bottom
    paddingBottom: 300, // Adjust the padding to move it up or down
  },
});

export default Loader;
