import React from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define route names
type RootStackParamList = {
  index: undefined;
  PropertyDetails: undefined;
  RequestaTour: undefined;
};

// Component
export default function TabLayout() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="PropertyDetails" options={{ title: 'Details', headerShown: true }} />
      <Stack.Screen
        name="RequestaTour"
        options={{
          title: '',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('index'); // Navigate to the home page
              }}
              style={({ pressed }) => ({
                marginHorizontal: 15, // Adjust margin as needed
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons name="home" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
