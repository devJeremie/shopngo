import { 
    ActivityIndicator,
    StyleSheet, Text,
    View } from 'react-native'
import React from 'react'
import { AppColors } from '@/constants/theme';
// Déclaration de l'interface des props, pour typer les arguments du composant
interface LoadingSpinnerProps {
    size?: "small" | "large";
    color?: string;
    text?: string;
    fullScreen?: boolean;
}
// Définition du composant fonctionnel
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = "small",
    color = AppColors.primary[500],
    text = "Loading...",
    fullScreen= false,
}) => {
    // Si "fullScreen" est true, on retourne un spinner dans une View stylée
    if (fullScreen) {
        return(
        <View style={styles.fullScreen}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
        );
    }
    // Sinon, on retourne le spinner dans une View "container"
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
  )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.background.primary,
    },
    text: {
        marginTop: 8,
        fontSize: 14,
        color: AppColors.text.primary,
    }
})