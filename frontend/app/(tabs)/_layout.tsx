import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Ionicons, Foundation, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function TabLayout() {


  return (
    <Tabs
      screenOptions={{

        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="Shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => (
            <Foundation name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={28} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}
