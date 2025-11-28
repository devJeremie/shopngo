import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '@/constants/theme';
import Button from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import StripePayment from '@/components/StripePayment';

// Fonction utilitaire pour extraire un paramètre sous forme de chaîne de caractères
const getStringParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? value[0] : value || "";

// Composant principal gérant l'écran de paiement utilisateur
const PaymentScreen = () => {
    // Initialisation du router pour la navigation après paiement
    const router = useRouter();
    // Récupération des paramètres passés à l'écran (Stripe & commande)
    const { paymentIntent, ephemeralKey, customer, orderId, total} = 
        useLocalSearchParams();
        // Récupération des infos de l'utilisateur authentifié
        const {user} = useAuthStore();
        // Conversion du montant total reçu en nombre
        const totalValue = Number(getStringParam(total));

        // Initialisation du composant StripePayment avec les paramètres nécessaires
        const stripe = StripePayment ({
            paymentIntent: getStringParam(paymentIntent),
            ephemeralKey: getStringParam(ephemeralKey),
            customer: getStringParam(customer),
            orderId: getStringParam(orderId),
            userEmail: user?.email || "",
            // Callback exécuté en cas de succès du paiement
            onSuccess: ()=>router.push("/(tabs)/orders"),
        });
    // Affichage de l'interface de paiement
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Complétez votre paiement</Text>
        <Text style={styles.subtitle}>
            Veuillez confirmer vos informations de paiement pour finaliser la commande
        </Text>
        <Text style={styles.totalPrice}>Total: €{totalValue.toFixed(2)}</Text>
        {/* Bouton de déclenchement du paiement Stripe */}
        <Button 
            title="Confimer votre paiement" 
            onPress={stripe.handlePayment}
            fullWidth
            style={styles.button}
        />
    </View>
  )
}

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: AppColors.background.primary,
        justifyContent: "center",
    },
    title: {
        fontFamily: "Inter-Bold",
        fontSize: 24,
        color: AppColors.text.primary,
        textAlign: "center",
        marginBottom: 16,
    },
    subtitle: {
        fontFamily: "Inter-Regular",
        fontSize: 16,
        color: AppColors.text.secondary,
        textAlign: "center",
        marginBottom: 32,
    },
    totalPrice: {
        fontFamily: "Inter-Bold",
        fontSize: 20,
        color: AppColors.text.primary,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
});