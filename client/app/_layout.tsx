import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Signin from './SignIn';
import Signup from './SignUp';
import HousesScreen from './HousesScreen';
import AdminPage from './adminPage';
import FAQ from './FAQ';
import Maps from './Maps';
import FilterComponent from './FilterComponent';
import RequestTour from './RequestTour';
import AboutUs from './AboutUs';
import PropertyDetails from './PropertyDetails';
import FilteredDataComponent, { Residence } from './FilteredDataComponent';
import PostProperty from './PostProperty';
import ManagePosts from './ManagePosts';
import PostDetail from './PostDetail';

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  AdminDrawer: undefined;
  HousesScreen: undefined;
  AboutUs: undefined;
  FAQ: undefined;
  Maps: undefined;
  FilterComponent: undefined;
  adminPage: undefined;
  PropertyDetails: undefined;
  RequestTour: undefined;
  PostProperty: undefined;
  Favorite: undefined;
  FilteredDataComponent: { criteria: any };
  ManagePosts: undefined;
  PostDetail: { post: Residence };
  // AdditionalInfo: { userId: string };
};


const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (

    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="SignIn"
        component={Signin}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
      />

      <Stack.Screen
        name="ManagePosts"
        component={ManagePosts}
        options={{ headerShown: true }}
      />

<Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ headerShown: true }}
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetails}
      />
      <Stack.Screen
        name="FilterComponent"
        component={FilterComponent}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="FilteredDataComponent"
        component={FilteredDataComponent}
        options={{ headerShown: true }}
      />
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
        name="adminPage"
        component={AdminPage}
      />
      {/* <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} /> */}
    </Stack.Navigator>

  );
}
