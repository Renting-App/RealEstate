// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { Button, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Welcome from '../app/Welcome';
import Signin from '../app/SignIn';
import Signup from '../app/SignUp';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  // AdditionalInfo: { userId: string };
};

export default function App() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
  
      <Stack.Navigator initialRouteName="HousesScreen">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
        
        
        {/* <Stack.Screen
          name="AdminPage"
          component={AdminPage}
        /> */}
        {/* <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} /> */}
      </Stack.Navigator>
 
  );
}



