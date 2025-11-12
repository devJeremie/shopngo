// Import du composant Tabs pour la navigation par onglets
import { Tabs } from 'expo-router';
import React from 'react';
// Import d’un composant personnalisé pour gestion du retour haptique sur les tabs
import { HapticTab } from '@/components/haptic-tab';
// Import des icônes utilisées pour les onglets
import { Ionicons, Foundation, Feather } from '@expo/vector-icons';
// Couleurs du thème général de l’application
import { AppColors } from '@/constants/theme';
import { Colors } from '@/constants/theme';
// Hook pour détecter le thème clair/sombre du device
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  // Détection du mode 'light' ou 'dark' pour adapter les couleurs des tabs
  const colorSheme = useColorScheme();


  return (
    // <Tabs />
     // Définition de la barre d’onglets principale de l’app
    <Tabs
    // Options générales pour l’ensemble des onglets
      screenOptions={{
        // Couleur de l’onglet actif, dépend du thème sélectionné
        tabBarActiveTintColor: Colors[colorSheme ?? 'light'].tint,
        // Masque la barre d’en-tête (header) sur toutes les pages dans les tabs
        headerShown: false,
        // Utilise le composant personnalisé pour feedback haptique sur chaque bouton d’onglet
        tabBarButton: HapticTab,
      }}>
        {/* Onglet Accueil (Home), icône maison */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
       {/* Onglet Boutique (Shop), icône chariot */}
       <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => (
            <Foundation name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
       {/* Onglet Profil (Profile), icône utilisateur */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={28} color={color} />
          ),
        }}      
      />
      {/* Les onglets suivants sont masqués du tab bar mais accessibles via navigation */}
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="favorites" options={{ href: null }} />
      <Tabs.Screen name="cart" options={{ href: null }} />
      <Tabs.Screen name="product/[id]" options={{ href: null }} />
      <Tabs.Screen name="login" options={{ href: null }} />
      <Tabs.Screen name="signup" options={{ href: null }} />
      <Tabs.Screen name="orders" options={{ href: null }} />
      <Tabs.Screen name="payment" options={{ href: null}} />
    </Tabs>
  );
}
// Export du layout principal de navigation par onglets