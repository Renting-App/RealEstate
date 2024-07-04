import { Tabs ,Stack} from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"  options={ { title :'home' } }
   
      />
    <Stack.Screen
        name="PropertyDetails"  
        options={ { title :'Details' }}
      />

    </Stack>
  );
}
