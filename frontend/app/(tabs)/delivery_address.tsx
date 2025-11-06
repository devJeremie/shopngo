import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColors } from '@/constants/theme'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import Button from '@/components/Button'

const DeliveryAdressScreen: React.FC = () => {
    const { user } = useAuthStore();
    const router = useRouter();

    const [address, setAdress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const fetchLastOrder = async () => {
            if (!user) return;
            setLoading(true);
            const { data, error } = await supabase
                .from("orders")
                .select('id')
                .eq("user_id", user.id)
                .order("created_at", {ascending: false})
                .limit(1)
                .single();
            setLoading(false);
            if (error) {
                Alert.alert("Erreur", "Impossible de récupérer votre commande");
            } else if (data) {
                setOrderId(data.id);
            }
        };
        fetchLastOrder();
    }, [user]);

    const handleAddAddress = async () => {
        if (!orderId) {
            Alert.alert("Erreur", "Aucune commande trouvée pour l'ajout d'addresse");
            return;
        }
        if (!address.trim) {
            Alert.alert("Validation", "l'adresse ne peut pas être vide");
            return;
        }
        setLoading(true);
        const {error} = await supabase
            .from("orders")
            .update({delivery_address: address})
            .eq("id", orderId);
        setLoading(false);
        if (error) {
            Alert.alert("Erreur", "Impossible d'ajouter l'adresse");
        } else {
            Alert.alert("Succés", "Adresse ajouté avec succés");
            router.back();
        }
    };
  return (
    <View style={styles.container}>
        <Text style={styles.containerTitle}>Ajouter une adresse de livraison</Text>
        <TextInput
            style={styles.input}
            placeholder='Entrez votre adresse'
            value={address}
            onChangeText={setAdress}
            multiline
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