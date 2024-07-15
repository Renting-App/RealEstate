// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// // import WelcomeScreen from '../app/index';
// // import SignInScreen from '../app/SignIn';
// // import SignUpScreen from '../app/SignUp';

// // const Stack = createStackNavigator();

// // export default function AuthStack() {

// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen name="index" component={WelcomeScreen} />
// //         <Stack.Screen name="signIn" component={SignInScreen} />
// //         <Stack.Screen name="signUp" component={SignUpScreen} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }

// import React from 'react';
// import { Button, Pressable } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// // import Welcome from '../app/Welcome
// // import Signin from './SignIn';
// // import Signup from './SignUp';
// import HousesScreen from '../app/HousesScreen';
// import AdminPage from '../app/adminPage';
// import PostProperty from '../app/PostProperty';
// import FAQ from '../app/FAQ';
// import Maps from '../app/Maps';
// import FilterComponent from '../app/FilterComponent';
// import RequestTour from '../app/RequestTour';
// import AboutUs from '../app/AboutUs';
// import PropertyDetails from '../app/PropertyDetails';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import Welcome from '@/app/Welcome';
// import Signin from '@/app/SignIn';
// import Signup from '@/app/SignUp';

// const Stack = createStackNavigator();

// export type RootStackParamList = {
//   Welcome: undefined;
//   Signin: undefined;
//   Signup: undefined;
//   HousesScreen: undefined;
//   AboutUs: undefined;
//   FAQ: undefined;
//   Maps: undefined;
//   FilterComponent: undefined;
//   AdminPage: undefined;
//   PropertyDetails: undefined;
//   RequestaTour: undefined;
//   PostProperty: undefined;
//   // AdditionalInfo: { userId: string };
// };

// export default function App() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   return (
  
//       <Stack.Navigator initialRouteName="HousesScreen">
//         <Stack.Screen
//           name="Welcome"
//           component={Welcome}
//         />
//         <Stack.Screen
//           name="Signin"
//           component={Signin}
//         />
//         <Stack.Screen
//           name="Signup"
//           component={Signup}
//         />
//         <Stack.Screen
//           name="HousesScreen"
//           component={HousesScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AboutUs"
//           component={AboutUs}
//           options={{
//             headerShown: true,
//             title: '',
//             headerLeft: () => (
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('HousesScreen'); // Navigate to the home page
//                 }}
//                 style={({ pressed }) => ({
//                   marginHorizontal: 15, // Adjust margin as needed
//                   opacity: pressed ? 0.5 : 1,
//                 })}
//               >
//                 <Ionicons name="home" size={24} color="black" />
//               </Pressable>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="FAQ"
//           component={FAQ}
//           options={{
//             headerShown: true,
//             title: '',
//             headerLeft: () => (
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('HousesScreen'); // Navigate to the home page
//                 }}
//                 style={({ pressed }) => ({
//                   marginHorizontal: 15, // Adjust margin as needed
//                   opacity: pressed ? 0.5 : 1,
//                 })}
//               >
//                 <Ionicons name="home" size={24} color="black" />
//               </Pressable>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="PostProperty"
//           component={PostProperty}
//           options={{
//             headerShown: true,
//             title: '',
//             headerLeft: () => (
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('HousesScreen'); // Navigate to the home page
//                 }}
//                 style={({ pressed }) => ({
//                   marginHorizontal: 15, // Adjust margin as needed
//                   opacity: pressed ? 0.5 : 1,
//                 })}
//               >
//                 <Ionicons name="home" size={24} color="black" />
//               </Pressable>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="PropertyDetails"
//           component={PropertyDetails}
//           options={{
//             headerShown: true,
//             title: '',
//             headerLeft: () => (
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('HousesScreen'); // Navigate to the home page
//                 }}
//                 style={({ pressed }) => ({
//                   marginHorizontal: 15, // Adjust margin as needed
//                   opacity: pressed ? 0.5 : 1,
//                 })}
//               >
//                 <Ionicons name="home" size={24} color="black" />
//               </Pressable>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="Maps"
//           component={Maps}
//           options={{
//             headerShown: true,
//             title: '',
//             headerLeft: () => (
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('HousesScreen'); // Navigate to the home page
//                 }}
//                 style={({ pressed }) => ({
//                   marginHorizontal: 15, // Adjust margin as needed
//                   opacity: pressed ? 0.5 : 1,
//                 })}
//               >
//                 <Ionicons name="home" size={24} color="black" />
//               </Pressable>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="RequestTour"
//           component={RequestTour}
//           options={{
//             headerShown: true,
//             title: '',
//             headerLeft: () => (
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate('HousesScreen'); // Navigate to the home page
//                 }}
//                 style={({ pressed }) => ({
//                   marginHorizontal: 15, // Adjust margin as needed
//                   opacity: pressed ? 0.5 : 1,
//                 })}
//               >
//                 <Ionicons name="home" size={24} color="black" />
//               </Pressable>
//             ),
//           }}
//         />
//         <Stack.Screen
//           name="AdminPage"
//           component={AdminPage}
//         />
//         {/* <Stack.Screen name="AdditionalInfo" component={AdditionalInfo} /> */}
//       </Stack.Navigator>
 
//   );
// }


