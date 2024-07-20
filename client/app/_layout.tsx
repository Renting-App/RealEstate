import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./Welcome";
import Signin from "./SignIn";
import Signup from "./SignUp";
import HousesScreen from "./HousesScreen";
import AdminPage from "./adminPage";
import FAQ from "./FAQ";
import Maps from "./Maps";
import FilterComponent from "./FilterComponent";
import RequestTour from "./RequestTour";
import AboutUs from "./AboutUs";
import PropertyDetails from "./PropertyDetails";
import FilteredDataComponent from "./FilteredDataComponent";
import PostProperty from "./PostProperty";
import MyAccount from "./MyAccount";
import MyProperties from "./MyProperties";
import Favorite from "./Favorite";
import { FavoritesProvider } from './FavoritesContext';
//import UpdatePropertyForm from "./UpdatePropertyForm";
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
  FilteredDataComponent: { criteria: any };
  MyProperties: undefined;
  MyAccount: undefined;
  //UpdatePropertyForm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FavoritesProvider>
    <Stack.Navigator
      initialRouteName="HousesScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="HousesScreen" component={HousesScreen} />
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
      <Stack.Screen name="PostProperty" component={PostProperty} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
      <Stack.Screen name="Favorite" component={Favorite} />
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
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="MyProperties" component={MyProperties} />
      {/*<Stack.Screen name="UpdatePropertyForm" component={UpdatePropertyForm} />*/}
    </Stack.Navigator>
    
    </FavoritesProvider>
  );
}
