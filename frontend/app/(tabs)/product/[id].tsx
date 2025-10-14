import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const SingleProductScreen = () => {

    const {id} = useLocalSearchParams<{ id: string }>();
    console.log("id", id);

  return (
    <View>
      <Text>SingleProductScreen</Text>
    </View>
  )
}

export default SingleProductScreen

const styles = StyleSheet.create({})