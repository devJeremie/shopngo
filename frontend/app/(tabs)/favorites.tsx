import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useFavoritesStore } from '@/store/favoriteStore';
import HomeHeader from '@/components/HomeHeader';
import { AppColors } from '@/constants/theme';
import Wrapper from '@/components/Wrapper';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
// Composant React Native affichant la liste des produits favoris de l'utilisateur.
const FavoritesScreen = () => {
  // Hook de navigation pour gérer la redirection entre les écrans.
  const router = useRouter();
  // Récupération du store des favoris :
  // - favoriteItems : ensemble des produits ajoutés aux favoris
  // - resetFavorite : fonction pour vider la liste des favoris
  const { favoriteItems, resetFavorite } = useFavoritesStore();
  // console.log(favoriteItems);

  // Fonction de redirection vers la page boutique.
  const navigateToProducts = () => {
    router.push("/(tabs)/shop")
  }
  // Affichage d'un état vide si l'utilisateur n'a aucun produit en favori.
  if(favoriteItems?.length === 0 ) {
    return <Wrapper>
      <HomeHeader />
      <EmptyState 
        type="favorites"
        message="Vous n'avez pas ajouté de produits a vos favoris"
        actionLabel='Voir les produits'
        // Redirection bouton "Voir les produits"
        onAction={navigateToProducts}
      />
    </Wrapper>
  }
  // Si la liste des favoris contient des éléments, on les affiche ici.
  return (
    <View style={{flex: 1}}>
      <HomeHeader />
        {favoriteItems?.length > 0 && (
        <Wrapper>
           {/* En-tête affichant le titre et le nombre de favoris + bouton de réinitialisation */}
          <View style={styles.headerView}>
            <View style={styles.header}>
              <Text style={styles.title}>Produits favoris</Text>
              <Text style={styles.itemCount}>{favoriteItems?.length} produits</Text>
            </View>
            <View>
               {/* Bouton pour supprimer tous les favoris */}
              <TouchableOpacity
                onPress={() => resetFavorite()}
              >
                <Text style={styles.resetText}>Reset les favoris</Text>
              </TouchableOpacity>
            </View>
          </View>
           {/* Liste affichant les produits favoris sous forme de grille */}
          <FlatList 
            // Source de données : les produits favoris
            data={favoriteItems}
            // Clé unique pour chaque élément
            keyExtractor={(item)=>item.id.toString()}
            // Deux produits affichés par ligne
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.productContainer}>
                {/* Carte produit occupant toute la largeur de sa colonne*/}
                <ProductCard product={item} customStyle={{width: '100%'}}/>
              </View>
            )}
            // Style de la grille principale
            contentContainerStyle={styles.productsGrid}
            // Espacement entre les colonnes
            columnWrapperStyle={styles.columnWrapper}
            // Masque la barre de défilement
            showsVerticalScrollIndicator={false}
            // Marge en bas de la liste
            ListFooterComponent={<View style={styles.footer}/>}
          />
        </Wrapper>
    )}
    </View>
  );
};

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  headerView: {
    paddingBottom: 5,
    backgroundColor: AppColors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {

  },
  resetText: {
    color: AppColors.error,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: AppColors.text.primary,
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: AppColors.text.secondary,
    marginTop: 2, 
  },
  productsGrid: { 
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '48%',
  },
  footer: {
    height: 100,
  },
})