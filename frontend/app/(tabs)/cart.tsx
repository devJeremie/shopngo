import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

const CartScreen = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false); 

  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({

})