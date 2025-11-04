import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { AppColors } from '@/constants/theme';

interface Order {
    id: number;
    total_Price: number;
    payment_status: string;
    created_at: string;
    items: {
        product_id: number;
        title: string;
        price: number;
        quantity: number;
        image: string;
    }[];
}

interface Props {
    order:Order;
    onDelete: (id:number)=>void;
    email: string | undefined;
}

const OrderItem = ({order, onDelete, email}: Props) => {
    const isPaid = order?.payment_status === "success"; //verifier que jai bien mis success et pas succes
    const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text>OrderItem</Text>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
    
    payNowButton: {
        marginTop: 8, 
        backgroundColor: AppColors.primary[500],
        paddingVertical: 6,
        width: 80,
        borderRadius: 4,
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    payNowText: {
        fontFamily: 'Inter-Medium',
        color: "#fff",
        fontSize: 14,
    }
})