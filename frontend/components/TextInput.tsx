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
  container: {
    marginBottom: 16,
    width: "100%"
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text.primary,
  },
  input: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColors.gray[300],
    color: AppColors.text.primary,
  },
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