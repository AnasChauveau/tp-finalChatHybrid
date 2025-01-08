import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';  // Pour la navigation

// Empêche l'écran de démarrage de disparaître immédiatement
SplashScreen.preventAutoHideAsync();

const App = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Cache le SplashScreen après 2 secondes
      await SplashScreen.hideAsync();
      router.replace('/home'); // Redirige vers la page d'accueil
    }, 2000);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [router]);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Bienvenue sur Chat is my best hybrid friend</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
});

export default App;

