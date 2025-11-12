import { 
  Platform, StyleSheet,
  Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '@/constants/theme';

// Composant Wrapper qui sert de conteneur sûr pour l'affichage de contenu
// Il utilise SafeAreaView pour éviter les zones non interactives (notch, barres systèmes)
// et un View stylisé pour positionner les enfants.
// La prop children représente le contenu à afficher à l'intérieur du Wrapper.
const Wrapper = ({ children } : { children: React.ReactNode}) => {
  return (
    // SafeAreaView prend en compte les zones à éviter sur différents appareils
    <SafeAreaView style={styles.safeView}>
        {/* Vue principale contenant le contenu enfant */}
        <View style={styles.container}>
            {/* Affiche dynamiquement tout ce que Wrapper enveloppe */}
            {children}
        </View>
    </SafeAreaView>
    
  )
}

export default Wrapper

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: AppColors.background.primary,
        marginTop: Platform.OS === 'android' ? 30 : 0,
    },
    container: {
        flex: 1,
        backgroundColor: AppColors.background.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
    } 

})