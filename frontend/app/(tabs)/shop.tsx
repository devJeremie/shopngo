import { 
  FlatList, Modal, Platform, 
  ScrollView, StyleSheet, 
  Text, TouchableOpacity, 
  View 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppColors } from '@/constants/theme';
import Wrapper from '@/components/Wrapper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProductStore } from '@/store/productStore';
import { API_URL } from '@/config';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import ProductCard from '@/components/ProductCard';



const ShopScreen = () => {
  const {q:searchParam,category:categoryParam} = useLocalSearchParams<{
    q?:string; 
    category?:string
  }>();
  console.log(categoryParam);

  const {
    filteredProducts, 
    selectedCategory, loading, 
    error, fetchProducts,
    setCategory, sortProducts,  
    fetchCategories, categories,
  } = useProductStore();
  
  const [showShortModal, setShowShortModal] = useState(false);
  const [activeSortOption, setActiveSortOption] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, []);
  console.log(loading);
  
    const router = useRouter();

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Tous les produits</Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <TouchableOpacity 
            style={styles.searchRow}
            onPress={() => router.push("/(tabs)/search")}
          >
          <View style={styles.searchContainer}>
            <View style={styles.searchInput}>
              <Text>Cherchez un produit...</Text>
            </View>
          </View>
          <View 
            style={styles.searchButton}
          >
            <Ionicons 
              name="search"
              size={20}
              color="white"
            />
          </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={ () => setShowShortModal(true)}
            style={[
              styles.sortOption,
              isFilterActive && styles.activeSortButton, 
            ]}
          >
            <AntDesign 
              name='filter'
              size={20}
              color={AppColors.text.primary}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity 
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.selectedCategory
            ]}
            onPress={() => setCategory(null)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === null && styles.selectedCategoryText
              ]}
            >
            Tous
            </Text>
          </TouchableOpacity>
          {categories?.map((category) =>(
            <TouchableOpacity 
              onPress={() => setCategory(category)}
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
            >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  if (error) {
    return (
      <Wrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erreur: {error}</Text>
        </View>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {renderHeader()}
      {loading ? (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
         <LoadingSpinner fullScreen />;
       </View>
      ) : filteredProducts?.length === 0 ? (
        <EmptyState 
          type='search'
          message="Pas de produits trouvé dans votre recherche"
        />
      ) : ( 
        <FlatList 
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.productContainer}>
              <ProductCard product={item} customStyle={{ width: '100%'}}/>
            </View>
          )}
          contentContainerStyle= {styles.productsGrid}
          columnWrapperStyle= {styles.columnWrapper}
          showsVerticalScrollIndicator  //pour ceux qui ne le veulent pas il suffit ={false}
          ListEmptyComponent={<View style= {styles.footer} />}
        />
      )}
      <Modal 
        visible={showShortModal}
        transparent
        animationType='fade'
        onRequestClose={() => setShowShortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}></View>
        </View>
      </Modal>
    </Wrapper>
  );
};


export default ShopScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: 16,
    backgroundColor: AppColors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray[200],
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: AppColors.text.primary,
    marginBottom: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flex: 1,
    marginRight: 5,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: AppColors.gray[300],
    color: AppColors.text.primary,
  },
  searchInputStyle: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    borderColor: "transparent",
  },
  searchButton: {
    backgroundColor: AppColors.primary[500],
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    position: "absolute",
    right: 0, 
  },
  sortButton: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  activeSortButton: {
    borderWidth: 1,
    borderColor: AppColors.error,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.background.secondary,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: AppColors.primary[500],
  },
  categoryText: {
    fontFamily:"Inter-Medium",
    fontSize: 14,
    color: AppColors.text.primary,
  },
  selectedCategoryText: {
    color: AppColors.background.primary,
  },
  productsGrid: {
    paddingHorizontal: 5,
    paddingTop: 16,
    paddingBottom: 50,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productContainer: {
    width:'48%',
  },
  footer: {
    height: 100,
  },
  modalOverlay:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: AppColors.background.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
   },
  modalTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  sortOption: {
    // paddingVertical: 16,
    borderWidth: 1,
    borderColor: AppColors.gray[200],
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSortOption: {
    backgroundColor: AppColors.background.secondary
  },
  sortOptionText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.text.primary,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: AppColors.error,
    textAlign: "center",
  },
})