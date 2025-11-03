import { 
    StyleSheet, Text, 
    View 
} from 'react-native'
import React from 'react';
import { useStripe } from "@stripe/stripe-react-native";

type Props = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  orderId: string; 
  userEmail: string;
  onSuccess?: () => void;
}

const StripePayment = ({
  paymentIntent, ephemeralKey,
  customer, orderId,
  userEmail, onSuccess
}: Props) => {
  return (
    <View>
      <Text>StripePayment</Text>
    </View>
  )
}

export default StripePayment

const styles = StyleSheet.create({})