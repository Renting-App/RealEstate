// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { NavigationProp } from '@react-navigation/native';
// import { auth, firestore } from '../config/firebase';
// import { doc, getDoc } from 'firebase/firestore';

// type AdminPageProps = {
//     navigation: NavigationProp<any>;
// };

// const AdminPage: React.FC<AdminPageProps> = ({ }) => {
//     const [loading, setLoading] = useState(true);
//     const [isAdmin, setIsAdmin] = useState(false);

//     useEffect(() => {
//         const checkAdminRole = async () => {
//             const user = auth.currentUser;
//             if (user) {
//                 const userDoc = await getDoc(doc(firestore, 'users', user.uid));
//                 const userData = userDoc.data();
//                 if (userData && userData.role === 'admin') {
//                     setIsAdmin(true);
//                 }
//             }
//             setLoading(false);
//         };

//         checkAdminRole();
//     }, []);

//     if (loading) {
//         return (
//             <View style={styles.container}>
//                 <Text>Loading...</Text>
//             </View>
//         );
//     }

//     if (!isAdmin) {
//         return (
//             <View style={styles.container}>
//                 <Text>You do not have access to this page.</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Text>Welcome to the Admin Page!</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default AdminPage;
