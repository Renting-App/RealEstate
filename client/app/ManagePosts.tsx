// ManagePosts.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, Residence } from './_layout'; // Adjust the import path

const ManagePosts: React.FC = () => {
    const [posts, setPosts] = useState<Residence[]>([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const fetchResidences = () => {
        fetch("http://192.168.1.13:5800/houses")
            .then((response) => response.json())
            .then((data) => {
                const mappedResidences = data.map((residence: any) => ({
                    _id: residence._id,
                    title: residence.title,
                    address: residence.address,
                    size: residence.size,
                    price: residence.price,
                    rooms: residence.rooms,
                    bathrooms: residence.bathrooms,
                    description: residence.description,
                    contact_info: residence.contact_info,
                    images: residence.images,
                    visits: residence.visits,
                    operation: residence.operation,
                    amenities: residence.amenities,
                    location: residence.location,
                    subLocation: residence.subLocation,
                    condition: residence.condition,
                    favourite: residence.favourite
                }));
                setPosts(mappedResidences);
            })
            .catch((error) => {
                console.error("Error fetching residences:", error);
            });
    };

    useEffect(() => {
        fetchResidences();
    }, []);

    const handleDelete = async (postId: string) => {
        try {
            await fetch(`http://192.168.1.13:5800/api/deletehouse/${postId}`, {
                method: 'DELETE',
            });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleUpdate = (postId: string) => {
        // Implement your update logic here
        console.log(`Update post with ID: ${postId}`);
    };

    const handleView = (post: Residence) => {
        navigation.navigate('PostDetail', { post });
    };

    const renderItem = ({ item }: { item: Residence }) => (
        <View style={styles.card}>
            {item.images.length > 0 && (
                <Image source={{ uri: item.images[0] }} style={styles.image} />
            )}
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.address}</Text>
                <Text style={styles.details}>Price: ${item.price}</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={() => handleView(item)}>
                        <MaterialCommunityIcons name="eye" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.updateButton]} onPress={() => handleUpdate(item._id)}>
                        <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete(item._id)}>
                        <MaterialCommunityIcons name="delete" size={24} color="#fff" />
                        <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        marginVertical: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    image: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    viewButton: {
        backgroundColor: '#007bff',
    },
    updateButton: {
        backgroundColor: '#28a745',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
});

export default ManagePosts;
