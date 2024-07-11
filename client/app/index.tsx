// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import WelcomeScreen from './welcome';
// // import SignInScreen from './signIn';
// // // import AdminPage from './adminPage';
// // import SignUpScreen from './signUp';
// // import HousesScreen from "@/app/home"
// // const Stack = createStackNavigator();


// // const App = () => {
// //     return (

// //         <Stack.Navigator initialRouteName="welcome">
// //             <Stack.Screen name="SignIn" component={SignInScreen} />
// //             {/* <Stack.Screen name="AdminPage" component={AdminPage} /> */}
// //             <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
// //             <Stack.Screen name="welcome" component={WelcomeScreen} />
// //             <Stack.Screen name="home" component={HousesScreen} />
// //         </Stack.Navigator>

// //     );
// // };
// // export type RootStackParamList = {
// //     Welcome: undefined;
// //     Signin: undefined;
// //     Signup: undefined;
// //     HousesScreen: undefined;
// // };
// // // export default App;


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Welcome from './Welcome';
// import Signin from './SignIn';
// import Signup from './SignUp';
// import HousesScreen from './HousesScreen';

// const Stack = createStackNavigator();

// export type RootStackParamList = {
//     Welcome: undefined;
//     Signin: undefined;
//     Signup: undefined;
//     HousesScreen: undefined;
// };
// const App: React.FC = () => {
//     return (

//         <Stack.Navigator initialRouteName="Welcome">
//             <Stack.Screen name="Welcome" component={Welcome} />
//             <Stack.Screen name="Signin" component={Signin} />
//             <Stack.Screen name="Signup" component={Signup} />
//             <Stack.Screen name="HousesScreen" component={HousesScreen} />
//         </Stack.Navigator>

//     );
// };



// export default App;

//mariem code

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Signin from './SignIn';
import Signup from './SignUp';
import HousesScreen from './HousesScreen'; // Assuming Index is HousesScreen

const Stack = createStackNavigator();

export type RootStackParamList = {
  Welcome: undefined;
  Signin: undefined;
  Signup: undefined;
  HousesScreen: undefined;
};
const App: React.FC = () => {
  return (

    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="HousesScreen" component={HousesScreen} />
    </Stack.Navigator>

  );
};

export default App;