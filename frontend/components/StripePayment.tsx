import { 
  Alert,
    StyleSheet, Text, 
    View 
} from 'react-native'
import React from 'react';
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

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
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const router = useRouter();
  //Initialize payment sheet
  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      merchantDisplayName: 'Shopngo Store',
    });
    if (error) {
      throw new Error(`Échec de l’initialisation de la feuille de paiement: ${error}`);
    }

    const updatePaymentStatus = async () =>{
      const {error} =  await supabase
        .from("orders")
        .update({ payment_status: "succes" })
        .eq("id", orderId)
        .select();

      if (error) {
        throw new Error(`Échec de l’initialisation de la feuille de paiement: ${error}`);
      }
    };

    const handlePayment = async () => {
      try {
        await initializePaymentSheet()
        const { error: presentError } = await presentPaymentSheet();
        if(presentError) {
          throw new Error(`Paiement échoué: ${presentError.message}`);
        }
        await updatePaymentStatus();
        Alert.alert("Paiement réussi!", "Merci pour votre commande",[
          {
            text: "OK",
            onPress: () => {
              onSuccess?.() || router.push("/(tabs)/orders");
            },
          },
        ]);
      } catch (error) {
        Alert.alert("Paiment échoué");
        console.log("Paiment échoué erreur:", error);
        
      }
    };
  };
  return (
    <View>
      <Text>StripePayment</Text>
    </View>
  );
};

export default StripePayment

const styles = StyleSheet.create({})