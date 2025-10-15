import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const { user, logout, checkSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      checkSession();
    }
  }, [user]);
  
  return (
    <SafeAreaView>
        <View>
            <Text>ProfileScreen</Text>
        </View>
    </SafeAreaView>
    
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})