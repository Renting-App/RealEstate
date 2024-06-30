import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const handleSearch = () => {
    // Implement your search logic here
    console.log('Performing search...');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Find Your Dream Home</ThemedText>

      <Pressable onPress={handleSearch} style={styles.button}>
        <Ionicons name="search" size={24} color="black" style={styles.buttonIcon} />
        <ThemedText type="subtitle">Search Properties</ThemedText>
      </Pressable>

      <ThemedView style={styles.featuredContainer}>
        {/* Placeholder for featured properties or other content */}
        <ThemedText type="subtitle">Featured Properties</ThemedText>
        {/* Add your featured property components here */}
      </ThemedView>

      <ThemedView style={styles.stepsContainer}>
        <ThemedText type="subtitle">Steps to Get Started</ThemedText>
        {/* Steps content */}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 24
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 10,
  },
  featuredContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  stepsContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 16,
  },
});

