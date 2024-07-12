

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index'; // Update the path if necessary
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

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
            // const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
            // const user = userCredential.user;
            // await setDoc(doc(firestore, 'users', user.uid), {
            //     email: value.email,
            //     // userName: value.username,
            //     // phoneNumber: value.phoneNumber,
            //     role: 'user'
            // });

            // navigation.navigate('AdditionalInfo', { userId: user.uid });
            navigation.navigate('Signin');

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
            <Text>Signup Page</Text>
            <View style={styles.controls}>
                <Input
                    placeholder='Email'
                    containerStyle={styles.control}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    leftIcon={<Icon
                        name='envelope'
                        size={16}
                    />}
                />
                <Input
                    placeholder='Password'
                    containerStyle={styles.control}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        name='key'
                        size={16}
                    />}
                />

                <Button title="Submit" buttonStyle={styles.control} onPress={signUp} />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    controls: {
        flex: 1,
    },

    control: {
        marginTop: 10
    },

    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    }
});

export default Signup;