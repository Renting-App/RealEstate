import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './_layout'; // Import RootStackParamList

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;

const PaymentScreen: React.FC = () => {
  const route = useRoute<PaymentScreenRouteProp>();
  const { adminFee } = route.params;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async () => {
    // Initialize the payment sheet
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: 'your_payment_intent_client_secret', // From your backend
      merchantDisplayName: 'Your Merchant Name', // Required
      // Include any other required parameters here
    });

    if (!error) {
      // Present the payment sheet to the user
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', `Payment failed: ${paymentError.message}`);
      } else {
        // Payment was successful
        Alert.alert('Success', 'Payment successful!');
      }
    } else {
      Alert.alert('Error', `Initialization failed: ${error.message}`);
    }
  };

  return (
    <View>
      <Text>Admin Fee: {adminFee.toFixed(2)} DT</Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
