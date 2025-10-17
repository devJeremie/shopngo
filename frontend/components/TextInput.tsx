import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { AppColors } from '@/constants/theme';

const TextInput = () => {
  return (
    <View>
      <Text>TextInput</Text>
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({
    multiligneInput: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    inputError:{
        borderColor: AppColors.error
    },
    errorText: {
        color: AppColors.error,
        fontSize: 12,
        marginTop: 4,
    }
})