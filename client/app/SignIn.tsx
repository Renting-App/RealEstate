import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackParamList } from "./_layout";
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

type SigninScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

type Props = {
  navigation: SigninScreenNavigationProp;
};

const Signin: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const user = userCredential.user;

    //   if (!user.emailVerified) {
    //     Alert.alert('Email not verified', 'Please check your email and verify your account.');
    //     await auth.signOut()
    //     return
    // }
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      const userData = userDoc.data();
      if (userData && userData.role === "admin") {
        navigation.navigate("adminPage");
      } else {
        // navigation.navigate("HousesScreen", { criteria: {} });
        navigation.reset({
          index: 0,
          routes: [{ name: 'HousesScreen' }],
      });
      }
    } catch (error) {
      if (error instanceof Error) {
        setValue({
          ...value,
          error: "Invalid email or password",
        });
      } else {
        setValue({
          ...value,
          error: "An unknown error occurred",
        });
      }
    }
  }
  const resetPassword = async () => {
    if (value.email === '') {
        Alert.alert('Error', 'Please enter your email to reset your password.');
        return;
    }
    try {
        await sendPasswordResetEmail(auth, value.email);
        Alert.alert('Success', 'Password reset email sent.');
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert('Error', 'An unknown error occurred.');
        }
    }
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign in</Text>
        <Image
          source={require('../assets/images/signin.png')}
          style={styles.image}
          resizeMode="center"
        />
      </View>
      <View style={styles.inputContainer}>
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
          secureTextEntry={!showPassword}
          leftIcon={<Icon name="key" size={16} />}
          rightIcon={
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={16}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {value.error ? <Text style={styles.errorText}>{value.error}</Text> : null}
        <Button title="Submit" buttonStyle={styles.button} onPress={signIn} />
        <Text style={
          {
            textAlign: 'center',
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 10
          }}>
          You don't have an account yet ?</Text>
        <Button
          title="Sign up"
          buttonStyle={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate("SignUp")}
        />
      <Button title="Forgot Password" type="clear" onPress={resetPassword} />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: "center",

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000040", // navy blue color for text
    position: "absolute",
    top: -90,
    right: 70
  },
  image: {
    position: "absolute",
    top: -320,
    right: -200,
    width: Dimensions.get('window').width, // 60% of screen width
    height: Dimensions.get('window').height * 0.5, // 30% of screen height
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 20,
    marginTop: 10
  },
  button: {
    backgroundColor: "#000080", // Medium green for button
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 20,
    width: 100,

    alignSelf: 'center'
  },
  signupButton: {
    backgroundColor: "#000080", // Darker green for signup button
    marginTop: 10,
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 10,
  },
});

export default Signin;
