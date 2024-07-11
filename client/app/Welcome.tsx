// // import React from 'react';
// // import { StyleSheet, Text, View } from 'react-native';
// // import { StackScreenProps } from '@react-navigation/stack';
// // import { Button } from 'react-native-elements';

// // const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Welcome screen!</Text>

// //       <View style={styles.buttons}>
// //         <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('signIn')} />
// //         <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('signUp')} />
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     paddingTop: 20,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },

// //   buttons: {
// //     flex: 1,
// //   },

// //   button: {
// //     marginTop: 10
// //   }
// // });

// // export default WelcomeScreen;



// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { Button } from 'react-native-elements';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './index';
// type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

// type Props = {
//   navigation: WelcomeScreenNavigationProp;
// };
// const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text>Welcome screen!</Text>
//       <View style={styles.buttons}>
//         <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Signin')} />
//         <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Signup')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttons: {
//     flex: 1,
//   },
//   button: {
//     marginTop: 10,
//   }
// });

// export default WelcomeScreen;


//mariem code

import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index'; // Update the path if necessary

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the App!</Text>
      <Button title="Start" onPress={() => navigation.navigate('Signin')} />
    </View>
  );
};

export default Welcome;