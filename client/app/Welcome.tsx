
import React from 'react';
import { View, Text, StyleSheet, Dimensions ,Image} from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout'; // Update the path if necessary

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your Home !</Text>
      <Image 
        source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_icon_black.png' }}
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
  ,image: {
    width: Dimensions.get('window').width * 0.8, // Adjust width as per requirement
    height: Dimensions.get('window').height * 0.3, // Adjust height as per requirement
    marginBottom: 20,
  },
  buttons: {
    width: '80%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 15,
  },
});

export default Welcome;