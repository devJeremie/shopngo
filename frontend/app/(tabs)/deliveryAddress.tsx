import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColors } from '@/constants/theme'
import { useAuthStore } from '@/store/authStore'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'
import Button from '@/components/Button'
// Composant React Native pour gérer l'ajout d'une adresse de livraison à une commande existante.
const DeliveryAdressScreen: React.FC = () => {
    // Récupération des informations d'utilisateur depuis le store d'authentification.
    const { user } = useAuthStore();
    // Hook de navigation pour rediriger ou revenir à l'écran précédent.
    const router = useRouter();
    // États locaux pour gérer :
    // - address : l'adresse saisie par l'utilisateur
    // - loading : l'état de chargement des requêtes asynchrones
    // - orderId : l'identifiant de la dernière commande de l'utilisateur
    const [address, setAdress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { orderId } = useLocalSearchParams();
   
    // Fonction déclenchée lors du clic sur le bouton "Ajouter l'adresse".
    const handleAddAddress = async () => {
        console.log('User:', user?.id, 'OrderId:', orderId); //verification
        
        if (!user || !orderId) {
            Alert.alert("Erreur", "Aucune commande récente trouvée pour l'ajout d'adresse");
            return;
        }
        // Vérifie que le champ adresse n'est pas vide ou composé uniquement d'espaces.
        if (!address.trim()) {
            Alert.alert("Validation", "L'adresse ne peut pas être vide");
            return;
        }
        // Indicateur de chargement activé.
        setLoading(true);
        // Mise à jour de l'adresse de livraison dans la table "orders" pour la commande spécifiée.
        const { error } = await supabase
            .from("orders")
            .update({ delivery_address: address })
            .eq("id", orderId); //Modifie uniquement la commande en cours

        setLoading(false);

        if (error) {
            Alert.alert("Erreur", "Impossible de modifier l'adresse");
        } else {
            Alert.alert("Succès", "Adresse modifiée avec succès");
            // Retour à la page précédente.
            // router.push({
            //     pathname: "/(tabs)/payment",
            //     params: {orderId}
            // })
            router.back();
        }
    };
// Interface utilisateur avec champ de saisie et bouton d'action.
  return (
    <View style={styles.container}>
        <Text style={styles.containerTitle}>Ajouter une adresse de livraison</Text>
        <TextInput
            style={styles.input}
            placeholder='Entrez votre adresse'
            value={address}
            onChangeText={setAdress}
            multiline
            // Champ désactivé pendant le chargement.
            editable={!loading}
        />
        <Button
            onPress={handleAddAddress}
            title={loading ? 'Chargement...' : "Ajouter l'adresse"}
            fullWidth
            style={styles.button}
        />
    </View>
  );
};

export default DeliveryAdressScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: AppColors.background.primary,
    },
    containerTitle: {
        fontFamily: "Inter-Regular",
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        height: 100,
        borderColor: AppColors.gray[300],
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        textAlignVertical: 'top',
    }, 
    button: {
    marginTop: 16,
  },
})