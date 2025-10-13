import { 
    StyleSheet, Text,
    View, StyleProp, 
    ViewStyle, Image,
    TouchableOpacity, 
    } from 'react-native';
import React from 'react';
import { AppColors } from '@/constants/theme';
import { Product } from '@/type';

interface ProductCardProps {
    product: Product;
    compact?: boolean; // Optionnel : pour afficher une version compacte de la carte    
    customStyle?: StyleProp<ViewStyle>; // Optionnel : pour des styles personnalisés
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    product, compact=false, customStyle
}) => {
    const { id, title, price, category, image } = product;
  return (
    <TouchableOpacity style= {
        [ styles.card, compact && styles.compactCard,
        customStyle]}
        activeOpacity={0.8}
    >
        <View style={styles.imageContainer}>
            <Image 
                source={{ uri: image }} 
                style={styles.image}
                resizeMode='contain'
            />
        </View>
        <View style={styles.content}>
            <Text style={styles.category}>{category}</Text>
            <Text 
                style={styles.title}
                numberOfLines={compact ? 1 :2}
                ellipsizeMode='tail'
            >
                {title}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>€{price.toFixed(2)}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    price:{
        fontSize:16,
        fontWeight:'600',
        color:AppColors.primary[600],
        marginBottom: 5,
    },
    footer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: AppColors.text.primary,
        marginBottom: 8,
    },
    category: {
        fontSize: 12,
        color: AppColors.text.tertiary,
        textTransform: 'capitalize',
        marginBottom: 4,
    },
    content: {
        padding: 12,
        backgroundColor: AppColors.background.secondary,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 18,
        padding: 2,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: AppColors.warning,
    },
    image: {
        width: '100%',
        height: '100%',
    }, 
    imageContainer: {
        position: 'relative',
        height: 150,
        width: 100,
        backgroundColor: AppColors.background.primary,
        padding: 5,
    },
    compactCard: {
        width: 150,
        marginRight: 12,
    },
    card: {
        backgroundColor: AppColors.background.primary,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        width: '48%',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: AppColors.gray[200],
    },
})