import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';

type AccountCreatedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountCreated'>;

type Props = {
    navigation: AccountCreatedScreenNavigationProp;
};

const AccountCreated: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("SignIn");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Account created successfully!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    message: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4BB543",
    },
});

export default AccountCreated;