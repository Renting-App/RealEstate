import React from 'react';
import { Stack } from 'expo-router';


export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }}  />
      <Stack.Screen name="PropertyDetails" options={{ title: 'Details' }}  />
  
    </Stack>
  );
}
