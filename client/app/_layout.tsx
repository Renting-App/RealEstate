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
// import Favourite from './Favorite';
import RequestTour from './RequestTour';
import AboutUs from './AboutUs';
import PropertyDetails from './PropertyDetails';
// import FilteredDataComponent from './FilteredData';
// import FilterComponent from './FilterComponent';


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
  Favorite: undefined;
  FilteredData: { criteria: any };
  // AdditionalInfo: { userId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (

      <Stack.Navigator
        initialRouteName="HousesScreen"
        screenOptions={{ headerShown: false }}
      >
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
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PostProperty"
          component={PostProperty}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetails}
        />
        {/* <Stack.Screen
          name="FilterComponent"
          component={FilterComponent}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="FilteredData"
          component={FilteredDataComponent}
          options={{ headerShown: true }}
        /> */}
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="RequestTour"
          component={RequestTour}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="AdminPage"
          component={AdminPage}
        />
        {/* <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} /> */}
      </Stack.Navigator>

  );
}
