import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useFavoritesStore } from '@/store/favoriteStore';
import HomeHeader from '@/components/HomeHeader';

const FavoritesScreen = () => {
  const router = useRouter();
  const { favoriteItems, resetFavorite } = useFavoritesStore();
  // console.log(favoriteItems);

  return (
    <View>
      <HomeHeader />
      <Text>FavoritesScreen</Text>
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({})