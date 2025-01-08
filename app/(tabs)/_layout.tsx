import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, BackHandler, Pressable } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Fonction pour fermer l'application
  const closeApp = () => {
    BackHandler.exitApp(); // Ferme l'application sur Android
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Pour un effet de flou sur iOS
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          tabBarIcon: ({ color }) => null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat', // Le nom de l'onglet
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane" color={color} />, // Icône chat
        }}
      />
      
      {/* Onglet Dog */}
      <Tabs.Screen
        name="dog"
        options={{
          title: 'Dog', // Le nom de l'onglet
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pawprint" color={color} />, // Icône chien
        }}
      />

      {/* Onglet Click */}
      <Tabs.Screen
        name="click"
        options={{
          title: 'Click', // Le nom de l'onglet
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane" color={color} />, // Icône clic
        }}
      />
      <Tabs.Screen
        name="quit"
        options={{
          title: 'Quit',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane" color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
