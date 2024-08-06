// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { Input, Button } from "react-native-elements";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "./_layout"; // Update the path if necessary
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, firestore } from "../config/firebase";
// import { doc, setDoc } from "firebase/firestore";

// type SignupScreenNavigationProp = StackNavigationProp<
//     RootStackParamList,
//     "SignUp"
// >;

// type Props = {
//     navigation: SignupScreenNavigationProp;
// };

// const Signup: React.FC<Props> = ({ navigation }) => {
//     const [value, setValue] = React.useState({
//         email: '',
//         password: '',
//         username: '',
//         phoneNumber: '',
//         error: ''
//     })
//     const validateFields = () => {
//         if (value.email === '' || value.password === '' || value.username === '' || value.phoneNumber === '') {
//             setValue({ ...value, error: 'All fields are mandatory.' });
//             return false;
//         }

//         const phoneNumberRegex = /^\d{8}$/;
//         if (!phoneNumberRegex.test(value.phoneNumber)) {
//             setValue({ ...value, error: 'Invalid Phone number' });
//             return false;
//         }
//         return true;
//     }

//     const signUp = async () => {
//         // if (value.email === '' || value.password === '') {
//         //     setValue({
//         //         ...value,
//         //         error: 'Email and password are mandatory.'
//         //     })
//         //     return;
//         // }
//         // const phoneNumberRegex = /^\d{8}$/;
//         // if (!phoneNumberRegex.test(value.phoneNumber)) {
//         //     setValue({
//         //         ...value,
//         //         error: 'Invalid Phone number '
//         //     });
//         //     return;
//         // }

//         //     try {
//         //         await createUserWithEmailAndPassword(auth, value.email, value.password);
//         //         navigation.navigate('SignIn');
//         //     } catch (error) {
//         //         if (error instanceof Error) {
//         //             setValue({
//         //                 ...value,
//         //                 error: error.message,
//         //             });
//         //         } else {
//         //             setValue({
//         //                 ...value,
//         //                 error: 'An unknown error occurred',
//         //             });
//         //         }
//         //     }
//         // }
//         if (!validateFields()) return;

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
//             const user = userCredential.user;

//             await setDoc(doc(firestore, 'users', user.uid), {
//                 email: value.email,
//                 username: value.username,
//                 phoneNumber: value.phoneNumber,
//                 role: 'user',
//                 image: '',
//                 favorites: [],
//                 premium: false
//             });
//             //mongo
//             const response = await fetch("http:///192.168.1.22:58000/adduser", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     username: value.username,
//                     password: value.password,
//                     email: value.email,
//                     phone_number: parseInt(value.phoneNumber),
//                 }),
//             });

//             if (response.ok) {
//                 navigation.navigate('SignIn');
//             }
//             else {
//                 const errorMessage = await response.text();
//                 setValue({ ...value, error: errorMessage });
//               }
//             // else {
//             //     const errorMessage = await response.text();
//             //     setValue({
//             //         ...value,
//             //         error: errorMessage
//             //     });
//             // }
//         } catch (error) {
//             if (error instanceof Error) {
//                 setValue({
//                     ...value,
//                     error: error.message,
//                 });
//             } else {
//                 setValue({
//                     ...value,
//                     error: 'An unknown error occurred',
//                 });
//             }
//         }
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Sign up </Text>
//             <View style={styles.inputContainer}>
//                 <Input
//                     placeholder='Username'
//                     containerStyle={styles.input}
//                     value={value.username}
//                     onChangeText={(text) => setValue({ ...value, username: text })}
//                     leftIcon={<Icon
//                         name='user'
//                         size={16}
//                     />}
//                 />
//                 <Input
//                     placeholder='Phone Number'
//                     containerStyle={styles.input}
//                     value={value.phoneNumber}
//                     onChangeText={(text) => setValue({ ...value, phoneNumber: text })}
//                     leftIcon={<Icon
//                         name='phone'
//                         size={16}
//                     />}
//                     keyboardType='numeric'
//                 />
//                 <Input
//                     placeholder='Email'
//                     containerStyle={styles.input}
//                     value={value.email}
//                     onChangeText={(text) => setValue({ ...value, email: text })}
//                     leftIcon={<Icon name='envelope' size={16} />}
//                 />
//                 <Input
//                     placeholder='Password'
//                     containerStyle={styles.input}
//                     value={value.password}
//                     onChangeText={(text) => setValue({ ...value, password: text })}
//                     secureTextEntry={true}
//                     leftIcon={<Icon name='key' size={16} />}
//                 />
//                 {value.error ? <Text style={styles.errorText}>{value.error}</Text> : null}
//                 <Button title="Submit" buttonStyle={styles.button} onPress={signUp} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 50,
//         backgroundColor: "#f5f5f5",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     inputContainer: {
//         width: "80%",
//     },
//     input: {
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: "#007BFF",
//         borderRadius: 5,
//         paddingVertical: 15,
//         marginTop: 20,
//     },
//     errorText: {
//         color: "#ff0000",
//         marginBottom: 10,
//     },
// });

// export default Signup;

import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./_layout";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const Signup: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    error: ''
  });

  const validateFields = () => {
    if (value.email === '' || value.password === '' || value.username === '' || value.phoneNumber === '') {
      setValue({ ...value, error: 'All fields are mandatory.' });
      return false;
    }

    const phoneNumberRegex = /^\d{8}$/;
    if (!phoneNumberRegex.test(value.phoneNumber)) {
      setValue({ ...value, error: 'Invalid Phone number' });
      return false;
    }

    return true;
  };

  const signUp = async () => {
    if (!validateFields()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      Alert.alert('Success', 'Verification email sent. Please check your email.');


      await setDoc(doc(firestore, 'users', user.uid), {
        email: value.email,
        username: value.username,
        phoneNumber: value.phoneNumber,
        role: 'user',
        image: '',
        favorites: [],
        premium: false
      });

      // const response = await fetch("http://192.168.1.22:58000/adduser", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //         username: value.username,
      //         password: value.password,
      //         email: value.email,
      //         phone_number: parseInt(value.phoneNumber),
      //     }),
      // });

      // if (response.ok) {
      // }

      // else {
      //     const errorMessage = await response.text();
      //     setValue({ ...value, error: errorMessage });
      // }

      navigation.navigate("AccountCreated");
    }
    catch (error) {
      if (error instanceof Error) {
        setValue({ ...value, error: error.message });
      } else {
        setValue({ ...value, error: 'An unknown error occurred' });
      }
    }
  };

  return (
    <ScrollView >
      <View style={styles.container}>

        <Image
          source={require('../assets/images/Signup.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Username"
            containerStyle={styles.input}
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
            leftIcon={<Icon name="user" size={16} />}
          />
          <Input
            placeholder="Phone Number"
            containerStyle={styles.input}
            value={value.phoneNumber}
            onChangeText={(text) => setValue({ ...value, phoneNumber: text })}
            leftIcon={<Icon name="phone" size={16} />}
            keyboardType="numeric"
          />
          <Input
            placeholder="Email"
            containerStyle={styles.input}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon name="envelope" size={16} />}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            containerStyle={styles.input}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
            leftIcon={<Icon name="key" size={16} />}
          />
          {value.error ? <Text style={styles.errorText}>{value.error}</Text> : null}
          <Button title="Submit" buttonStyle={styles.button} onPress={signUp} />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000040", // Dark green color for text
  },
  image: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.29,
    margin: 8,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000080", // Medium green for button
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 10,
    width: 100,
    alignSelf: 'center'
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 10,
  },
});

export default Signup;