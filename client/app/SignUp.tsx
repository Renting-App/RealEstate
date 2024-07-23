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

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
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