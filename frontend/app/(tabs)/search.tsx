import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { AppColors } from '@/constants/theme'
import Wrapper from '@/components/Wrapper'
import { useProductStore } from '@/store/productStore'
import TextInput from '@/components/TextInput'


const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeOutRef = useRef<number | null>(null);
  const {
    products, filteredProducts, 
    loading, fetchProducts, 
    searchProductsRealTime,
  } = useProductStore();

  const handleSearchChange = () => {

  }

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Recherche de produits</Text>
        <View style={styles.searchRow}>
          <View style={styles.inputWrapper}>
            <TextInput 
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder='Rechercher un produit'
              style={styles.searchInput}
              inputStyle={styles.searchInputStyle}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Wrapper>
      {renderHeader()}
    </Wrapper>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
    backgroundColor: AppColors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray[200],
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: AppColors.text.primary,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    marginBottom: 0,
    flex: 1,
  },
  searchInputStyle: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    borderColor: 'transparent',
    paddingRight: 40,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: AppColors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  searchButton: {
    backgroundColor: AppColors.primary[500],
    borderRadius: 8,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  productsGrid: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    width: "48%",
    marginBottom: 16,
  },
  footer: {
    height: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: AppColors.error,
    fontSize: 16,
    textAlign: 'center',
  },
  emptyStateContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: AppColors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
})