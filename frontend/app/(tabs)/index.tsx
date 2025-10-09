import HomeHeader from '@/components/HomeHeader';
import { AppColors } from '@/constants/theme';
import { useState, useEffect } from 'react';
import { Product } from '@/type';
import { useProductStore } from '@/store/productStore';
import { 
  View, StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  // State local pour stocker les "produits en vedette"
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  // Extraction des données et méthodes depuis le store Zustand
  const {
    products, categories,
    fetchProducts, fetchCategories,
    loading, error,
  } = useProductStore();
  // Premier effet : chargement des produits et catégories à l'ouverture de l'écran
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  // Deuxième effet : sélection de produits "en vedette" quand products change
  useEffect(() => {
    // Si la liste des produits n'est pas vide
    if (products.length > 0) {
      // Crée une copie inversée des produits (pour simuler une sélection récente en tête de liste)
      const reverseProducts = [...products].reverse();
      // Met à jour le state local "featuredProducts"
      setFeaturedProducts(reverseProducts as Product[]);
    }
 }, [products]);

  return (
    <View style={styles.wrapper}>
      <HomeHeader />
    </View>
    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  }
});
