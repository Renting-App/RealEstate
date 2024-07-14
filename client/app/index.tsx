import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Signin from './SignIn';
import Signup from './SignUp';
import HousesScreen from './HousesScreen';
import AdminPage from './adminPage';
import PostProperty from './PostProperty';
import FAQ from './FAQ';
import Maps from './Maps';
import Favourite from './Favorite';
import FilterComponent from './FilterComponent';
import RequestTour from './RequestTour';
import AboutUs from './AboutUs';
import PropertyDetails from './PropertyDetails';




const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  HousesScreen: undefined;
  AboutUs: undefined;
  FAQ: undefined;
  Maps: undefined;
  FilterComponent: undefined;
  AdminPage: undefined;
  PropertyDetails: undefined;
  RequestTour: undefined;
  PostProperty: undefined;
  Favorite : undefined;
  // AdditionalInfo: { userId: string };
};


export default function App() {
  return (
   
    <Stack.Navigator
      initialRouteName="HousesScreen"
      screenOptions={{ headerShown: false }}>
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
      <Stack.Screen
        name="HousesScreen"
        component={HousesScreen}

      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}

      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}

      />

      <Stack.Screen
        name="PostProperty"
        component={PostProperty}
      />

      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetails}
      />

      <Stack.Screen
        name="Maps"
        component={Maps}

      />

      <Stack.Screen
        name="RequestTour"
        component={RequestTour}
      />
      <Stack.Screen
        name="AdminPage"
        component={AdminPage}
      />
      {/* <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} /> */}
    </Stack.Navigator>

  );
}

