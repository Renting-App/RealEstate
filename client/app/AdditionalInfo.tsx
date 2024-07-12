// // AdditionalInfo.tsx
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './index'; // Update the path if necessary
// import { updateUserProfile } from '../api/user'; // Import API function to update user profile

// type AdditionalInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdditionalInfo'>;

// type Props = {
//     navigation: AdditionalInfoScreenNavigationProp;
// };

// const AdditionalInfo: React.FC<Props> = ({ navigation }) => {
//     const [username, setUsername] = useState('');
//     const [phone, setPhone] = useState('');

//     const handleSave = async () => {
//         // Assuming you have a function to update user profile in your API
//         const success = await updateUserProfile(username, phone);
//         if (success) {
//             navigation.navigate('HousesScreen');
//         } else {
//             alert('Failed to save user information. Please try again.');
//         }
//     };

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
//                 value={phone}
//                 onChangeText={setPhone}
//                 style={styles.input}
//             />
//             <Button title="Save" onPress={handleSave} />
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
