import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { auth, firestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AdminDrawer from './AdminDrawer';
import Ionicons from '@expo/vector-icons/Ionicons';

type AdminScreenNavigationProp = StackNavigationProp<RootStackParamList, 'adminPage'>;

type Props = {
    navigation: AdminScreenNavigationProp;
};

const AdminPage: React.FC<Props> = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    useEffect(() => {
        const checkAdminRole = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                const userData = userDoc.data();
                if (userData && userData.role === 'admin') {
                    setIsAdmin(true);
                }
            }
            setLoading(false);
        };

        checkAdminRole();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!isAdmin) {
        return (
            <View style={styles.container}>
                <Text>You do not have access to this page.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.menuButton} onPress={() => setIsSidebarVisible(true)}>
                <Ionicons name="menu" size={32} color="#333" />
            </Pressable>
            <Text>Welcome to the Admin Page!</Text>
            <AdminDrawer
                isVisible={isSidebarVisible}
                onClose={() => setIsSidebarVisible(false)}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    menuButton: {
        position: 'absolute',
        top: 25,
        left: 20,
    },
});

export default AdminPage;
