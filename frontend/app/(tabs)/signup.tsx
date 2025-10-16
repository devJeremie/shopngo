import { 
  KeyboardAvoidingView, StyleSheet,
  Text, View,
 } from 'react-native'
import React from 'react';
import { Foundation } from '@expo/vector-icons';
import { AppColors } from '@/constants/theme';
import Wrapper from '@/components/Wrapper';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const SignUpScreen = () => {
  return (
    <Wrapper>
      <KeyboardAvoidingView>
        <ScrollView>
          <View>
            <View>
              <Foundation />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AppColors.primary[50],
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: AppColors.text.primary,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.text.secondary,
  },
  form: {
    width: "100%",
  },
  button: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24
  },
  footerText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: AppColors.text.secondary,
  },
  link: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: AppColors.primary[500],
    marginLeft: 4,
  },
  errorText: {
    color: AppColors.error,
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center"
  },
})