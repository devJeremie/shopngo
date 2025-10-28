import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import MainLayout from '@/components/MainLayout';

const CartScreen = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false); 

  return (
    <MainLayout>
      <View>
        <Text>Panier</Text>
      </View>
    </MainLayout>
  )
}

export default CartScreen

const styles = StyleSheet.create({

})