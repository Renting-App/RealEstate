import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Signin from './SignIn';
import Signup from './SignUp';
import HousesScreen from './HousesScreen';
import AdminPage from './adminPage';
import FilterComponentWrapper from './FilterComponentWrapper';
import FilteringData from './FilteringData';
import { Property } from './FilterComponent';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  HousesScreen: undefined;
  AdminPage: undefined;
  PropertyDetails: undefined;
  RequestaTour: undefined;
  PostProperty: undefined;
  FilterComponent: undefined;
  FilteringData: { filteredProperties: Property[] };
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="HousesScreen" component={HousesScreen} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="FilterComponent" component={FilterComponentWrapper} />
        <Stack.Screen 
          name="FilteringData" 
          component={FilteringData} 
          initialParams={{ filteredProperties: [] }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
