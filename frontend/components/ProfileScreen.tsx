import React, { useEffect, useState } from "react";
import { 
    View, Text, 
    TextInput,
    Alert, StyleSheet 
} from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { AppColors } from "@/constants/theme";
import Button from "@/components/Button";
import Toast from "react-native-toast-message";



const ProfileScreen: React.FC = () => {
    const { user } = useAuthStore();
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("profiles")
                .select("full_name, delivery_address, phone")
                .eq("id", user.id)
                .single();

            setLoading(false);
            
            if (error && error.code !== "PGRST116") { // ignore no row error
                Alert.alert("Erreur", "Impossible de charger le profil");
            } else if (data) {
                setFullName(data.full_name || "");
                setDeliveryAddress(data.delivery_address || "");
                setPhone(data.phone || "");
            }
        };
        fetchProfile();
    }, [user]);

    const saveProfile = async () => {
        if (!user) {
        Toast.show({
            type: "error",
            text1: "Erreur",
            text2: "Utilisateur non connecté",
            visibilityTime: 2000,
        });
        return;
        }
        setLoading(true);
        const { error } = await supabase.from("profiles").upsert({
            id: user.id,
            full_name: fullName,
            delivery_address: deliveryAddress,
            phone: phone,
            updated_at: new Date().toISOString(),
        });
        setLoading(false);
        if (error) {
            Toast.show({
            type: "error",
            text1: "Erreur",
            text2: "Impossible de sauvegarder le profil",
            visibilityTime: 2000,
            });
        } else {
           Toast.show({
            type: "success",
            text1: "Succès",
            text2: "Profil mis à jour avec succès",
            visibilityTime: 2000,
           });
           router.push('/(tabs)/profile'); //redirection vers la page profile après sauvegarde
        }
    };
  return (
    <View style={styles.container}>
        <Text style={styles.label}>Nom complet</Text>
        <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Votre nom complet"
        />
        <Text style={styles.label}>Adresse de livraison</Text>
        <TextInput
            style={styles.input}
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            placeholder="Votre adresse de livraison"
        />
        <Text style={styles.label}>Votre téléphone</Text>
        <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Votre numéro de téléphone"
            keyboardType="phone-pad"
        />
        <Button
            title={loading ? "Sauvegarde..." : "Sauvegarder le profil"}
            onPress={saveProfile}
            disabled={loading}
        />
    </View>
  );
};

export default ProfileScreen

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: AppColors.background.primary },
    label: { 
        marginTop: 15, 
        fontSize: 16, 
        fontWeight: "bold" },
    input: {
        borderWidth: 1,
        borderColor: AppColors.gray[300],
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
  },
})
