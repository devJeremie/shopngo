// Importation du client Supabase préconfiguré
import { supabase } from '@/lib/supabase';

// Importation de la fonction 'create' de Zustand pour la gestion d'état globale
import { create } from 'zustand';

// Définition du type utilisateur, avec id et email
export interface User {
    id: string;
    email: string;
}

// Définition du type du store d'authentification
// Il contient l'utilisateur, l'état de chargement,
// un éventuel message d'erreur, et les méthodes d'authentification
interface AuthState {
    user: User | null; // Utilisateur connecté ou null
    isLoading: boolean; // Indique si une opération est en cours
    error: string | null; // Contient le message d'erreur éventuel

    // Actions d'authentification :
    signup: (email: string, password: string) => Promise<void>; // Crée un compte
    login: (email: string, password: string) => Promise<void>; // Connecte un utilisateur
    logout: () => Promise<void>; // Déconnecte l'utilisateur
    checkSession: () => Promise<void>; // Vérifie la session en cours
}

// Création du store Zustand pour gérer l'authentification
export const useAuthStore = create<AuthState>((set) => ({
    user: null, // L'utilisateur est initialement déconnecté
    isLoading: false, // Aucun chargement en cours
    error: null, // Pas d'erreur à l'initialisation

    // Fonction de login par email et mot de passe
    login: async (email:string, password:string) => {
        try {
            // Début du chargement, réinitialisation de l'erreur
            set ({ isLoading: true, error: null});
            // Appel à l'API Supabase pour se connecter
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            // Gère l'erreur Supabase éventuelle
            if (error) throw error;

            // Si connexion réussie, met à jour l'utilisateur dans le store
            if (data && data.user) {
                set({
                    user: {
                        id: data.user.id,
                        email: data.user.email || "",
                    },
                    isLoading: false,
                });
            }

        } catch (error: any) {
            // En cas d'échec, stocke le message d'erreur et arrête le chargement
            set({ error: error.message, isLoading: false});
        }
    },

    // Fonction de création de compte utilisateur
    signup: async (email: string, password: string) => {
        try {
           // Indique le début du processus et réinitialise les erreurs
           set({isLoading:true, error:null});
           // Appel à l'API Supabase pour créer le compte
           const { data, error } = await supabase.auth.signUp({
            email,
            password
           });
           // Gère les erreurs éventuelles
           if(error) throw error;
           // Si succès, stocke le nouvel utilisateur
           if(data && data.user){
            set({ 
                user: {id: data.user.id, email: data.user.email ||"" },
                isLoading: false,
            });
           }
        } catch (error: any) {
            // Gère les erreurs lors de la création de compte
            set({ error: error.message, isLoading: false });
        }
    },

    // Fonction de déconnexion utilisateur
    logout: async () => {
        try {
            // Début du process de déconnexion, nettoyage de l'erreur
            set({ isLoading: true, error: null});
            // Appel à l'API Supabase pour se déconnecter
            const { error } = await supabase.auth.signOut();
            // Gère les erreurs éventuelles
            if (error) throw error;
            // Réinitialise le store à l'état déconnecté
            set ({ user: null, isLoading: false});
        } catch (error: any) {
            // Stocke l'erreur éventuelle
            set ({ error: error.message, isLoading: false});
        }
    },

    // Fonction pour vérifier la session en cours (refresh du token, reconnect...)
    checkSession: async () => {
        try {
           // Début du chargement et réinitialisation de l'erreur
           set({isLoading: true, error: null});
           // Appel à Supabase pour récupérer la session courante
           const {data, error} = await supabase.auth.getSession()
           if(error) throw error
           // Si session existante, met à jour l'utilisateur dans le store
           if (data && data.session) {
                const { user } = data.session;
                set({
                    user: {
                        id: user.id,
                        email: user.email || "",
                    },
                    isLoading: false,
                });
           } else {
            // Si aucune session, on met l'utilisateur à null
            set({ user: null, isLoading: false});
           }
        } catch (error: any) {
            // Gestion des erreurs lors du check de session
            set({ user: null, error: error.message, isLoading: false})
        }
    },
}));