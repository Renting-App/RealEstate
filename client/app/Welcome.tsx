import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Home!</Text>
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.buttons}>
        <Button title="Start" buttonStyle={styles.button} onPress={() => navigation.navigate('SignIn')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000080', // Dark green color for text
  },
  image: {
    width: Dimensions.get('window').width * 0.9, 
    height: Dimensions.get('window').height * 0.5, 
    marginBottom: 20,
  },
  buttons: {
    width: '80%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000080', // Medium green for button
    borderRadius: 5,
    paddingVertical: 15,
    width:100,
    alignSelf:'center'
  },
});

export default Welcome;