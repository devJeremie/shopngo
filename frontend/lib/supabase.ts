// Importation des variables d'environnement contenant les identifiants Supabase
import {
    EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY,
} from "@/config";
// Importation du client Supabase et des modules nécessaires
import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Implémentation d'un adaptateur de stockage personnalisé pour SecureStore
// Cet adaptateur permettra à Supabase de stocker les tokens d'authentification
// de manière sécurisée, selon la plateforme.
const ExpoSecureStoreAdapter = {
    // Récupère un élément depuis le stockage sécurisé
    getItem: (key: string) => {
        // Si on est sur le web, utiliser localStorage
        if (Platform.OS === "web") {
            return localStorage.getItem(key);
        }
        // Sinon (mobile), utiliser SecureStore de manière asynchrone
        return SecureStore.getItemAsync(key);
    },
    // Enregistre un élément dans le stockage sécurisé
    setItem: (key: string, value: string) => {
        // Utilisation de localStorage sur le web
        if (Platform.OS === "web") {
            localStorage.setItem(key, value);
            return;
        }
        // Utilisation de SecureStore sur mobile
        return SecureStore.setItemAsync(key, value);
    },
    // Supprime un élément du stockage sécurisé
    removeItem: (key: string) => {
        // Suppression avec localStorage sur le web
        if (Platform.OS === "web") {
            localStorage.removeItem(key);
            return;
        }
        // Suppression sécurisée avec SecureStore sur mobile
        return SecureStore.deleteItemAsync(key);
    },
};

// Initialisation des variables de connexion à Supabase
// Ces valeurs proviennent de tes variables d'environnement définies dans config.ts
const supabaseUrl = EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

// Création du client Supabase avec configuration de l'authentification
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        // On indique à Supabase d'utiliser notre adaptateur personnalisé
        storage: ExpoSecureStoreAdapter,
        // Active le rafraîchissement automatique du token lorsqu'il expire
        autoRefreshToken: true,
        // Rend la session persistante (l'utilisateur reste connecté entre les redémarrages)
        persistSession: true,
        // Désactive la détection de session à partir de l'URL, inutile sur mobile
        detectSessionInUrl: false, // Set to false for React Native
    },
});