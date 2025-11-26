import React, { useEffect, useState } from "react";
import { 
    View, Text, 
    TextInput, Button, 
    Alert, StyleSheet 
} from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { AppColors } from "@/constants/theme";



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
        Alert.alert("Erreur", "Utilisateur non connecté");
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
            Alert.alert("Erreur", "Impossible de sauvegarder le profil");
        } else {
            Alert.alert("Succès", "Profil mis à jour");
        // Optionnel : router.back();
        }
    };
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

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
