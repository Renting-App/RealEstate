

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            // await signInWithEmailAndPassword(auth, value.email, value.password);
            const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(firestore, 'users', user.uid));
            const userData = userDoc.data();
            if (userData && userData.role === 'admin') {
                navigation.navigate('AdminPage');
            } else {
                navigation.navigate('HousesScreen');
            }
            // navigation.navigate('HousesScreen');
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
        <View >
            <Text>Signin Page</Text>
            <View>
                <Input
                    placeholder='Email'
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    leftIcon={<Icon
                        name='envelope'
                        size={16}
                    />}
                />
                <Input
                    placeholder='Password'
                    
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        name='key'
                        size={16}
                    />}
                />
                <Button title="Submit"  onPress={signIn} />
                <Button title="Signup" onPress={() => navigation.navigate('Signup')} />

            </View>
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 20,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     controls: {
//         flex: 1,
//     },

//     control: {
//         marginTop: 10
//     },

//     error: {
//         marginTop: 10,
//         padding: 10,
//         color: '#fff',
//         backgroundColor: '#D54826FF',
//     }
// });

export default Signin;