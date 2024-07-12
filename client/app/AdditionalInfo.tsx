// // AdditionalInfo.tsx
// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import { Input, Button } from 'react-native-elements';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './index'; // Update the path if necessary
// import { firestore } from '../config/firebase';
// import { doc, updateDoc } from 'firebase/firestore';

// // type AdditionalInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdditionalInfo'>;

// // type Props = {
// //     navigation: AdditionalInfoScreenNavigationProp;
// //     userId: string
// // };

// type AdditionalInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdditionalInfo'>;

// type Props = {
//     navigation: AdditionalInfoScreenNavigationProp;
//     userId: string; // Pass the user ID received from Firebase Auth
//     // route: { params: { userId: string } }
// };

// const AdditionalInfo: React.FC<Props> = ({userId }) => {
//     // const { userId } = route.params;
//     const [username, setUsername] = React.useState('');
//     const [phoneNumber, setPhoneNumber] = React.useState('');

//     async function submitAdditionalInfo() {
//         if (username === '' || phoneNumber === '') {
//             // Handle validation or show error message
//             return;
//         }

//         try {
//             // Update Firestore document for the user
//             await updateDoc(doc(firestore, 'users', userId), {
//                 username: username,
//                 phoneNumber: phoneNumber
//             });

//             // Redirect to Signin screen after successful update
//             navigation.navigate('Signin');
//         } catch (error) {
//             console.error('Error updating document:', error);
//             // Handle error gracefully
//         }
//     }

// // const AdditionalInfo: React.FC<Props> = ({ navigation, userId }) => {
// //     const [username, setUsername] = useState('');
// //     const [phoneNumber, setPhoneNumber] = useState('');

// //     const handleSave = async () => {
// //         // Assuming you have a function to update user profile in your API
// //         const success = await updateUserProfile(username, phone);
// //         if (success) {
// //             navigation.navigate('HousesScreen');
// //         } else {
// //             alert('Failed to save user information. Please try again.');
// //         }
// //     };

//     return (
//         <View style={styles.container}>
//             <Text>Additional Info Page</Text>
//             <TextInput
//                 placeholder="Enter username"
//                 value={username}
//                 onChangeText={setUsername}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="Enter phone number"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 style={styles.input}
//             />
//             <Button title="Save" onPress={submitAdditionalInfo} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 10,
//         marginBottom: 20,
//         width: '80%',
//     },
// });

// export default AdditionalInfo;
