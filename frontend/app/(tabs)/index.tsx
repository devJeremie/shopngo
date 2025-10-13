import HomeHeader from '@/components/HomeHeader';
import { AppColors } from '@/constants/theme';
import { useState, useEffect } from 'react';
import { Product } from '@/type';
import { useProductStore } from '@/store/productStore';
import { 
  View, StyleSheet, 
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SafeAreaView } from 'react-native-safe-area-context';
import Wrapper from '@/components/Wrapper';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/ProductCard';

export default function HomeScreen() {
  const router = useRouter();
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
  }, []); //[products] = boucle infini attention
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

const navigateToCategory = (category: string) => {
  router.push({
    pathname: '/(tabs)/shop',
    params: { 
      category:category 
    },
  });
 }

 if(loading) {
  return(
     <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <LoadingSpinner fullScreen />
      </View>
    </SafeAreaView>
     
  );
 }
 if (error) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    </SafeAreaView>
  )
 }
  return (
    <View style={styles.wrapper}>
      <HomeHeader />
      <View style={styles.contentContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContainerView}
        >
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Catégories</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {categories?.map((category) => (
                <TouchableOpacity
                  style= {styles.categoryButton}
                  key={category}
                  onPress={()=>navigateToCategory(category)}
                >
                  <AntDesign 
                    name="tag"
                    size={16}
                    color={AppColors.primary[500]}
                  />
                  <Text style={styles.categoryText}>
                    {category.charAt(0).toUpperCase() + 
                  category.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Meilleurs Ventes</Text>
                <TouchableOpacity>
                  {/* onPress={navigateToAllProducts} dans le touchable opacity */}
                  <Text style={styles.seeAllText}>Voir tout</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
              data={featuredProducts}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredProductsContainer}
              renderItem={({ item }) => (
                <View style={styles.featuredProductContainer}>
                  <ProductCard product={item} compact/>
                </View>
              )}
            />
          </View>
          {/* Section des produits les plus récents */}
          <View style={styles.newestSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nouveautés</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir Tout</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productsGrid}>
              {products?.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                  <ProductCard 
                    product={product}
                    customStyle={{width: "100%"}}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  contentContainer: {
    // paddingHorizontal: 20,
    paddingLeft: 20,
  },
  scrollContainerView: {
    paddingBottom: 300,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  categoriesSection: {
    marginTop: 10,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.secondary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 5,
    minWidth: 100,
  },
  categoryText: {
    marginLeft: 6,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: AppColors.text.primary,
    textTransform: 'capitalize',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: AppColors.primary[500],
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: AppColors.primary[500],
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: AppColors.error,
    textAlign: 'center',
  },
  productContainer: {
    width: "48%",
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  newestSection: {
    marginVertical: 16,
    marginBottom: 32,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featuredProductsContainer: {

  },
  featuredProductContainer: {

  },
  featuredSection: {
    marginVertical: 16,
  },

});
