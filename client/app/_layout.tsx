import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./Welcome";
import Signin from "./SignIn";
import Signup from "./SignUp";
import HomeButton from './HomeButton';
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
import UpdatePropertyForm from "./UpdatePropertyForm";
import ManagePosts from "./ManagePosts";
import PostDetail from "./PostDetail";
import { ThemeProvider } from "./ThemeContext";
import EditProfile from "./EditProfile";
import AccountCreated from "./AccountCreated";
import NotificationDetails from "./NotificationDetails";
import NotificationList from "./NotificationList";
export type Residence = {
  _id: string;
  title: string;
  address: string;
  size: number;
  price: number;
  rooms: number;
  bathrooms: number;
  description: string;
  contact_info: string;
  images: string[];
  visits: number;
  operation: string;
  amenities: string[];
  location: string;
  subLocation: string;
  condition: string;
  favourite: boolean;
  NotificationList :undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SignOut: undefined;
  AdminDrawer: undefined;
  HousesScreen: { criteria: any };
  AboutUs: undefined;
  FAQ: undefined;
  Maps: undefined;
  FilterComponent: undefined;
  adminPage: undefined;
  PropertyDetails: { residence: string };
  RequestTour: undefined;
  PostProperty: undefined;
  Favorite: undefined;
  ManagePosts: undefined;
  PostDetail: { post: Residence };
  MyProperties: undefined;
  MyAccount: undefined;
  UpdatePropertyForm: any;
  EditProfile: undefined;
  AccountCreated: undefined;
  NotificationDetails: undefined;
  NotificationList:undefined
  FilteredDataComponent: { criteria: {}}
};

const Stack = createStackNavigator<RootStackParamList>();

const slideFromBottom = ({ current }: any) => {
  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0], // Adjust the height to match your screen height
  });

  return {
    cardStyle: {
      transform: [{ translateY }],
    },
  };
};


export default function App() {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        {/* <NavigationContainer> */}
        <Stack.Navigator
         initialRouteName="Welcome"
         screenOptions={({ route }) => ({
           // Apply the slideFromBottom transition only for 'SignIn' and 'SignUp'
           cardStyleInterpolator: route.name === 'SignIn' || route.name === 'SignUp' ? slideFromBottom : undefined,
           headerShown: true,
           headerTitle:''
         })}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignIn" component={Signin} />
          <Stack.Screen name="AccountCreated" component={AccountCreated} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen
            name="HousesScreen"
            component={HousesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="NotificationList" component={NotificationList} />
          <Stack.Screen name="PostProperty" component={PostProperty} />
          <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Favorite" component={Favorite} />
          <Stack.Screen name="FilterComponent" component={FilterComponent} />
          <Stack.Screen
            name="FilteredDataComponent"
            component={FilteredDataComponent}
            options={{
              headerRight: () => <HomeButton />, 
            }}
          />
          <Stack.Screen name="Maps" component={Maps} />
          <Stack.Screen name="RequestTour" component={RequestTour} />
          <Stack.Screen
            name="NotificationDetails"
            component={NotificationDetails}
          />
          <Stack.Screen
            name="adminPage"
            component={AdminPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManagePosts" component={ManagePosts} />
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="MyProperties" component={MyProperties} />
          <Stack.Screen
            name="UpdatePropertyForm"
            component={UpdatePropertyForm}
          />
        </Stack.Navigator>
        {/* </NavigationContainer> */}
      </ThemeProvider>
    </FavoritesProvider>
  );
}