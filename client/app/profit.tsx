import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Profit: React.FC = () => {
    const [profits, setProfits] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfits = async () => {
            try {
                const response = await axios.get('http://your-server-endpoint/profits'); 
                setProfits(response.data);
            } catch (error) {
                console.error('Error fetching profits:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfits();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Admin Profits</Text>
            {profits.length > 0 ? (
                profits.map((profit, index) => (
                    <View key={index} style={styles.profitItem}>
                        <Text style={styles.profitText}>Post {index + 1}: ${profit.toFixed(2)}</Text>
                    </View>
                ))
            ) : (
                <Text>No profits recorded yet.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profitItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profitText: {
        fontSize: 16,
    },
});

export default Profit;