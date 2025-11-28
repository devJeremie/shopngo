import { 
  Alert, StyleSheet, 
  Text, View 
} from 'react-native'
import React from 'react';
// Hook officiel Stripe pour React Native - fournit les fonctions de paiement [web:9][web:12]
import { useStripe } from "@stripe/stripe-react-native";
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import * as Linking from "expo-linking"

// Interface TypeScript définissant les props requises pour le composant
type Props = {
  paymentIntent: string;      // Secret client du PaymentIntent Stripe
  ephemeralKey: string;       // Clé éphémère du client Stripe
  customer: string;           // ID du client Stripe
  orderId: string;            // ID de la commande dans la base de données
  userEmail: string;          // Email de l'utilisateur effectuant le paiement
  onSuccess?: () => void;     // Callback optionnel en cas de succès du paiement
}

// Composant hook personnalisé gérant l'ensemble du flux Stripe Payment Sheet
const StripePayment = ({
  paymentIntent, ephemeralKey,
  customer, orderId,
  userEmail, onSuccess
}: Props) => {
  // Extraction des fonctions principales Stripe depuis le hook officiel
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const router = useRouter();
  // Génération de l'URL de retour pour le Payment Sheet (écran commandes)
  const returnURL = Linking.createURL("/(tabs)/orders");
  // Initialise le Payment Sheet Stripe avec les paramètres reçus du backend

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      merchantDisplayName: 'Shopngo Store',   // Nom affiché dans le Payment Sheet
      returnURL: returnURL,
    });
    if (error) {
      throw new Error(`Échec de l’initialisation de la feuille de paiement: ${error}`);
    }
  };

    // Met à jour le statut de paiement de la commande dans Supabase
    const updatePaymentStatus = async () =>{
      const {error} =  await supabase
        .from("orders")
        .update({ payment_status: "success" })    // Passage au statut payé
        .eq("id", orderId)
        .select();

      if (error) {
        throw new Error(`Échec de l’initialisation de la feuille de paiement: ${error}`);
      }
    };
    
    // Fonction principale déclenchant le processus de paiement complet
    const handlePayment = async () => {
      try {
        // Étape 1: Initialisation du Payment Sheet Stripe
        await initializePaymentSheet()
        // Étape 2: Présentation de l'interface de paiement native
        const { error: presentError } = await presentPaymentSheet();
        if(presentError) {
          throw new Error(`Paiement échoué: ${presentError.message}`);
        }
        // Étape 3: Mise à jour du statut commande en base après succès Stripe
        await updatePaymentStatus();
        // Étape 4: Notification succès et redirection
        Alert.alert("Paiement réussi!", "Merci pour votre commande",[
          {
            text: "OK",
            onPress: () => {
              // Appel du callback parent ou redirection par défaut
              onSuccess?.() || router.push("/(tabs)/orders");
            },
          },
        ]);
      } catch (error) {
        // Gestion d'erreur unifiée avec alerte utilisateur
        Alert.alert("Paiment échoué");
        console.log("Paiment échoué erreur:", error);
        
      }
    };
  
  return {
    handlePayment
  }
};
// Retourne uniquement la fonction de gestion du paiement (hook pattern)
export default StripePayment;

const styles = StyleSheet.create({})