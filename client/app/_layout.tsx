import React from 'react';
import { Stack } from 'expo-router';


export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="PropertyDetails" options={{ title: 'Details'}} />
      <Stack.Screen name="RequestaTour" options={{ title: 'Tour Request'}} />
   
    </Stack>
  );
}
