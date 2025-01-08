// app/(tabs)/quit.tsx

import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { BackHandler } from 'react-native';

export default function QuitScreen() {
  const router = useRouter();

  // Fonction pour fermer l'application
  const handleExit = () => {
    Alert.alert(
      'Quitter l\'application',
      'Êtes-vous sûr de vouloir quitter l\'application ?',
      [
        { text: 'Annuler', onPress: () => null, style: 'cancel' },
        { text: 'Oui', onPress: () => BackHandler.exitApp() }, // Fermer l'application sur Android
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Êtes-vous sûr de vouloir quitter l'application ?</Text>
      <Button title="Quitter" onPress={handleExit} />
      <Button title="Annuler" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
