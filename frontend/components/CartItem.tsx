import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Product } from '@/type';
import { useRouter } from 'expo-router';
import { useCartStore } from '@/store/cartStore';
import { AppColors } from '@/constants/theme';

interface CartItemProps {
    product: Product;
    quantity: number; 
}

const CartItem: React.FC<CartItemProps> = ({product, quantity}) => {
    const router = useRouter();
    const { updateQuantity, removeItem} = useCartStore();
  return (
    <View>
      <Text>CartItem</Text>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: AppColors.background.primary,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderWidth: 1,
        borderColor:AppColors.primary[200],
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: AppColors.background.secondary,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: AppColors.text.primary,
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: AppColors.primary[600],
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: AppColors.background.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantity: {
        fontSize: 14,
        fontWeight: "500",
        color: AppColors.text.primary,
        paddingHorizontal: 12,
    },
    removeButton: {
        marginLeft: 'auto',
        width: 28,
        height: 28,
        borderRadius: 4,
        backgroundColor: AppColors.background.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    }
})