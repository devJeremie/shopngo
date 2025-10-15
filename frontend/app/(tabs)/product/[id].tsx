import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { AppColors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import CommonHeader from '@/components/CommonHeader';
import { Product } from '@/type';
import { getProduct } from '@/lib/api';

const SingleProductScreen = () => {
  const {id} = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await getProduct(Number(id));
        setProduct(data);
      } catch (error) {
        setError('Failed to fetch product data');
        console.log('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProductData();
    }
  }, [id]);  
  console.log('Product data:', product);

  return (
    <View style={styles.headerContainerStyle}>
        <CommonHeader />
    </View>
  )
}

export default SingleProductScreen

const styles = StyleSheet.create({
    headerContainerStyle: {
        paddingTop: 30,
        backgroundColor: AppColors.background.primary,
    }

})