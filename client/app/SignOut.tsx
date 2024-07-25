// import React from 'react';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './_layout'; // Update the path if necessary
// import { getAuth, signOut } from "firebase/auth";


// type SignoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignOut'>;

// type Props = {
//     navigation: SignoutScreenNavigationProp;
// };

// const Signout: React.FC<Props> = ({ navigation }) => {
// //     const auth = getAuth();
// //     try {
// //      await   signOut(auth);
// //         console.log("User signed out successfully");
// //         navigation.navigate("SignIn"); // Use the correct route name for your Sign In screen
// //     } catch (error) {
// //         console.error("Error signing out: ", error);
// //     }

// const handleSignOut = async () => {
//     const auth = getAuth();
//     try {
//         await signOut(auth);
//         console.log("User signed out successfully");
//         navigation.navigate("SignIn"); // Use the correct route name for your Sign In screen
//     } catch (error) {
//         console.error("Error signing out: ", error);
//     }
// };

// React.useEffect(() => {
//     handleSignOut();
// }, []);

// return null;
// };

// export default Signout;