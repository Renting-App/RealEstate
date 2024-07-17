

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input, Button } from 'react-native-elements';
import { RootStackParamList } from './index'; // Update the path if necessary
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

type SigninScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signin'>;

type Props = {
    navigation: SigninScreenNavigationProp;
};

const Signin: React.FC<Props> = ({ navigation }) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(firestore, 'users', user.uid));
            const userData = userDoc.data();
            if (userData && userData.role === 'admin') {
                navigation.navigate('AdminPage');
            } else {
                navigation.navigate('HousesScreen');
            }
        } catch (error) {
            if (error instanceof Error) {
                setValue({
                    ...value,
                    error: error.message,
                });
            } else {
                setValue({
                    ...value,
                    error: 'An unknown error occurred',
                });
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign in </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    containerStyle={styles.input}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    leftIcon={<Icon name='envelope' size={16} />}
                />
                <Input
                    placeholder='Password'
                    containerStyle={styles.input}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon name='key' size={16} />}
                />
                {value.error ? <Text style={styles.errorText}>{value.error}</Text> : null}
                <Button title="Submit" buttonStyle={styles.button} onPress={signIn} />
                <Button title="Sign up" buttonStyle={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('Signup')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 15,
        marginTop: 20,
    },
    signupButton: {
        backgroundColor: '#28a745',
        marginTop: 10,
    },
    errorText: {
        color: '#ff0000',
        marginBottom: 10,
    },
});

export default Signin;