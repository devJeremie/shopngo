import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { AppColors } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';

const CommonHeader = () => {
  return (
    <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} >
            <Feather 
                name="arrow-left" size={24} 
                color={AppColors.text.primary} />
        </TouchableOpacity>
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.background.secondary,
    },
    favoriteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: AppColors.background.secondary,
    },
    activeFavoriteButton: {
        backgroundColor: AppColors.error
    },
})