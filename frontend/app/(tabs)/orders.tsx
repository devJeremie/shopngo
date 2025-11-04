import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import Wrapper from '@/components/Wrapper';
import { AppColors } from '@/constants/theme';
import { Title } from '@/components/customText';
import EmptyState from '@/components/EmptyState';
import OrderItem from '@/components/OrderItem';

interface Order {
  id: number;
  total_price: number; 
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

const OrdersScreen = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [ orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!user) {
      setError("Connectez-vous pour voir vos commandes");
      setLoading(false);
      return;
    }
    try {
      setLoading(true)
      const {data: {user:supabaseUser },} = await supabase.auth.getUser();
      // console.log(supabaseUser?.email);
      const {data, error} = await supabase
        .from("orders")
        .select("id, total_price, payment_status, created_at, items, user_email")
        .eq("user_email",user.email)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`)
      }
      setOrders(data || []);
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      setError(error.message || "Echec dans le chargement de vos commandes");
    } finally {
      setLoading(false);
    }
  };
  // console.log(orders);
  
  useEffect(() => {
    fetchOrders(); 
  }, [user]);

  const handleDeletOrder = async (orderId:number) => {
    try {
      if (!user) {
        throw new Error("User non connecté");
      }
      //Verify the order exists
      const { data: order, error: fetchError } = await supabase
        .from("orders")
        .select("id,user_email")
        .eq("id", orderId)
        .single();

        
    } catch (error) {
      console.error("Erreur dans la suppressin de commande:", error);
      Alert.alert("Error","Echec lors de la suppression, Réssayez encore.");
    }
  };

  if(error) {
    return (
      <Wrapper>
        <Title>Mes Commandes</Title>
        <View style={styles.erroContainer}>
          <Text style={styles.errorText}>Erreur</Text>
        </View>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Title>Mes commandes</Title>
      {orders?.length > 0 ? (
        <FlatList  
          data={orders}
          contentContainerStyle={{marginTop: 10, paddingBottom: 10}}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <OrderItem 
              order={item}
              email={user?.email} 
              onDelete={handleDeletOrder}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      ):( 
        <EmptyState 
          type="cart" 
          message="Voous n'avez pas de commandes" 
          actionLabel='Commencez le shopping' 
          onAction={() => router.push("/(tabs)/shop")} 
        />
      )}
    </Wrapper>
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  erroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.error,
    textAlign: "center",
  },
  listContainer: {
    paddingVertical: 16,
  }
})