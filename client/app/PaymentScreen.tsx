import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type PaymentScreenRouteParams = {
  isPremium: boolean;
  adminFee: number;
};

const PaymentScreen = () => {
  const route = useRoute<RouteProp<{ params: PaymentScreenRouteParams }, 'params'>>();
  const navigation = useNavigation();
  const { isPremium, adminFee } = route.params;

  const handleUpgradeToPremium = async () => {
    try {
      
      await fakeUpgradeToPremiumAPI();
      Alert.alert('Success', 'Your account has been upgraded to premium!');
      navigation.goBack();
    } catch (error) {
      console.error("Error upgrading to premium:", error);
      Alert.alert('Error', 'Failed to upgrade to premium. Please try again.');
    }
  };

  const handlePayment = () => {
    if (!isPremium) {
      Alert.alert(
        "Upgrade Required",
        "To post properties, you need a premium account.",
        [
          {
            text: "Upgrade to Premium",
            onPress: handleUpgradeToPremium,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert('Payment', `Proceeding with payment of ${adminFee} DT.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Screen</Text>
      {isPremium ? (
        <Text style={styles.info}>Admin Fee: {adminFee} DT</Text>
      ) : (
        <Text style={styles.info}>
          Your account is not premium. Upgrade to post properties.
        </Text>
      )}

      <Button
        title={isPremium ? "Pay Admin Fee" : "Upgrade to Premium"}
        onPress={handlePayment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 24,
  },
});

export default PaymentScreen;

// Mock function to simulate API call for upgrading to premium
const fakeUpgradeToPremiumAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};
