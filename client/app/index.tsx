

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Signin from './SignIn';
import Signup from './SignUp';
import HousesScreen from './HousesScreen'; // Assuming Index is HousesScreen
import AdminPage from './AdminPage'
// import AdditionalInfo from './AdditionalInfo'

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
  // AdditionalInfo:{userId:string}
};
const App: React.FC = () => {
  return (

    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="HousesScreen" component={HousesScreen} />
      <Stack.Screen name="AdminPage" component={AdminPage} />
      {/* <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} /> */}
    </Stack.Navigator>

  );
};

export default App;