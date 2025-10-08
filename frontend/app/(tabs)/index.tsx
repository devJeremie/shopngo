import HomeHeader from '@/components/HomeHeader';
import { AppColors } from '@/constants/theme';
import { useState } from 'react';
import { 
  View, Text, 
  StyleSheet, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
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
