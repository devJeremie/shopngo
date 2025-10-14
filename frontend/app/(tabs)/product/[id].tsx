import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { AppColors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import CommonHeader from '@/components/CommonHeader';

const SingleProductScreen = () => {

    const {id} = useLocalSearchParams<{ id: string }>();
    console.log("id", id);

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