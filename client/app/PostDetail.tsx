import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Residence } from './_layout';

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;
type PostDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetail'>;

type PostDetailProps = {
    route: PostDetailScreenRouteProp;
    navigation: PostDetailScreenNavigationProp;
};

const PostDetail: React.FC<PostDetailProps> = ({ route, navigation }) => {
    const { post } = route.params;
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: post.images[0] }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.details}>Address: {post.address}</Text>
                <Text style={styles.details}>Size: {post.size} sqft</Text>
                <Text style={styles.details}>Price: ${post.price}</Text>
                <Text style={styles.details}>Rooms: {post.rooms}</Text>
                <Text style={styles.details}>Bathrooms: {post.bathrooms}</Text>
                <Text style={styles.details}>Description: {post.description}</Text>
                <Text style={styles.details}>Contact: {post.contact_info}</Text>

                <Text style={styles.details}>Location: {post.location}, {post.subLocation}</Text>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 200,
    },
    detailsContainer: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        marginVertical: 2,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default PostDetail;