import { 
    StyleProp, StyleSheet,
    Text, View,
    TouchableOpacity, ViewStyle,
    ActivityIndicator, TextStyle,
 } from 'react-native'
import React from 'react';
import { AppColors } from '@/constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    disabled?: boolean;
    fullWidth?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const Button:React.FC<ButtonProps> = ({
    title, onPress,
    variant='primary',
    size='medium',
    fullWidth=false,
    disabled=false,
    loading=false,
    style,
    textStyle,
}) => {
    const buttonStyle=[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style
    ];

const textStyles=[
    styles.text,
    styles[`${variant}Text`],
    textStyle
];

  return (
    <TouchableOpacity 
        style={buttonStyle} 
        onPress={onPress} 
        disabled={disabled || loading} 
        activeOpacity={0.8}
    >
        {loading ? (
            <ActivityIndicator 
                color={
                    variant === 'primary' 
                    ? AppColors.background.primary 
                    : AppColors.primary[500]}
            />
        ) : (
            <Text style={textStyles}>{title}</Text>
        )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text:{
        fontWeight:'600',
    },
    fullWidth:{
        width: '100%',
    },
    disabled:{
        opacity: 0.5,
    },
    //Conteneur du bouton
    primary:{
        backgroundColor: AppColors.primary[500],
    },
    secondary:{
        backgroundColor: AppColors.accent[500],
    },
    outline:{
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: AppColors.primary[500],
    },
    ghost:{
        backgroundColor: 'transparent',
    },
    //Styles du bouton
    primaryText:{
        color: AppColors.background.primary,
    },
    secondaryText:{
        color: AppColors.background.primary,
    },
    outlineText: {
        color: AppColors.primary[500],
    },
    ghostText: {
        color: AppColors.primary[500],
    },
    //Taille du bouton
    small:{
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    medium:{
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    large:{
        paddingVertical: 16,
        paddingHorizontal: 32,
        
    },

})