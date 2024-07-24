import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout'; // Update the path if necessary
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

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
    })

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }
        const phoneNumberRegex = /^\d{8}$/;
        if (!phoneNumberRegex.test(value.phoneNumber)) {
            setValue({
                ...value,
                error: 'Invalid Phone number '
            });
            return;
        }

        //     try {
        //         await createUserWithEmailAndPassword(auth, value.email, value.password);
        //         navigation.navigate('SignIn');
        //     } catch (error) {
        //         if (error instanceof Error) {
        //             setValue({
        //                 ...value,
        //                 error: error.message,
        //             });
        //         } else {
        //             setValue({
        //                 ...value,
        //                 error: 'An unknown error occurred',
        //             });
        //         }
        //     }
        // }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
            const user = userCredential.user;

            await setDoc(doc(firestore, 'users', user.uid), {
                email: value.email,
                username: value.username,
                phoneNumber: value.phoneNumber,
                role: 'user'
            });

            navigation.navigate('SignIn');
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
            <Text style={styles.title}>Sign up </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Username'
                    containerStyle={styles.input}
                    value={value.username}
                    onChangeText={(text) => setValue({ ...value, username: text })}
                    leftIcon={<Icon
                        name='user'
                        size={16}
                    />}
                />
                <Input
                    placeholder='Phone Number'
                    containerStyle={styles.input}
                    value={value.phoneNumber}
                    onChangeText={(text) => setValue({ ...value, phoneNumber: text })}
                    leftIcon={<Icon
                        name='phone'
                        size={16}
                    />}
                    keyboardType='numeric'
                />
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
                <Button title="Submit" buttonStyle={styles.button} onPress={signUp} />
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
    errorText: {
        color: '#ff0000',
        marginBottom: 10,
    },
});

export default Signup;