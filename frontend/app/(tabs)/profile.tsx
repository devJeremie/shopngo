import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from "expo-router";
import Wrapper from '@/components/Wrapper'; 
import { AppColors } from '@/constants/theme';
import Button from '@/components/Button';
import { Feather, FontAwesome, FontAwesome5, Foundation } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { user, logout, checkSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      checkSession();
    }
  }, [user]);

  const menuItems = [
    {
      id: 'cart',
      icon:(
        <Foundation 
          name= "shopping-cart" 
          size={20}  
          color={AppColors.primary[500]}
        />
      ),
      title: 'Mon panier',
      onPress: () => {
        router.push("/(tabs)/cart");
      }
    },
    {
      id: 'orders',
      icon:(
        <FontAwesome5
          name="box-open"
          size={16}
          color={AppColors.primary[500]}
        />
      ),
      title: "Mes commandes",
      onPress: () => {
        router.push("/(tabs)/orders");
      },
    },
    {
       id: 'payment',
      icon:(
        <Foundation
          name="credit-card"
          size={20}
          color={AppColors.primary[500]}
        />
      ),
      title: "Mes Paiements",
      onPress: () => {
        
      },
    },
    {
     id: 'address',
      icon:(
        <Foundation
          name="home"
          size={20}
          color={AppColors.primary[500]}
        />
      ),
      title: "Adresse de livraison",
      onPress: () => {
        
      },
    },
    {
     id: 'settings',
      icon:(
        <Foundation
          name="home"
          size={20}
          color={AppColors.primary[500]}
        />
      ),
      title: "Paramètres",
      onPress: () => {
        
      },
    }
  ];

  return (
    <Wrapper>
      {user ? (
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Mon Profil</Text>
          </View>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Feather 
                name='user'
                size={40}
                color={AppColors.gray[400]}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <TouchableOpacity>
                <Text style={styles.editProfileText}>Modifier mon profil</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {menuItems?.map((item) => (
              <TouchableOpacity key={item?.id}>
                <View>
                  {item?.icon}
                  <Text>{item?.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.message}>Svp connectez-vous ou inscrivez vous pour accéder à votre profil</Text>
          <View style={styles.buttonContainer}>
            <Button title="Connexion" fullWidth 
                    style={styles.loginButton}
                    textStyle={styles.buttonText}
                    onPress={() => router.push("/(tabs)/login")} //normalement ("/(tabs)/login")
            />
            <Button title="Inscription" fullWidth 
                    variant='outline'
                    style={styles.signupButton}
                    textStyle={styles.signupButtonText}
                    onPress={() => router.push("/(tabs)/signup")} //normalement ("/(tabs)/signup")
            />
          </View>
        </View>
      )}
    </Wrapper>
  );
};

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingBottom: 16,
    backgroundColor: AppColors.background.primary,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: AppColors.text.primary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: "center",
    // backgroundColor: AppColors.background.primary,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray[200],
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileEmail: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: AppColors.text.primary,
  },
  editProfileText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.primary[500],
  },
  menuContainer: {
    marginTop: 16,
    backgroundColor: AppColors.background.primary,
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray[200],
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: AppColors.text.primary,
    marginLeft: 12,
  },
  logoutContainer: {
    marginTop: 24,
    //paddingHorizontal: 16
  },
  logoutButton: {
    backgroundColor: "transparent",
    borderColor: AppColors.error,
  },
  logoutButtonText: {
    color: AppColors.error,
  },
  message: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.text.secondary,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  loginButton: {
    backgroundColor: AppColors.primary[500]
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: AppColors.background.primary,
  },
  signupButton: {
    borderColor: AppColors.primary[500],
    backgroundColor: "transparent"
  },
  signupButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: AppColors.primary[500],
  },
})