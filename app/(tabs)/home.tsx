import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';  // Importation du module expo-brightness

export default function HomeScreen() {
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    // Fonction pour ajuster la luminosité en fonction du niveau de la batterie
    const adjustBrightness = async (level: number) => {
      if (level > 0.5) {
        // Luminosité au maximum si la batterie est supérieure à 50%
        await Brightness.setSystemBrightnessAsync(1);
      } else {
        // Luminosité au minimum si la batterie est inférieure ou égale à 50%
        await Brightness.setSystemBrightnessAsync(0.2);
      }
    };

    // Fonction pour obtenir et mettre à jour le niveau de la batterie
    const getBatteryStatus = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
      adjustBrightness(level);  // Ajuste la luminosité à l'initialisation
    };

    // Ajouter un écouteur pour les changements de niveau de batterie
    const batteryListener = Battery.addBatteryLevelListener((batteryInfo) => {
      const { batteryLevel } = batteryInfo;
      setBatteryLevel(batteryLevel);
      adjustBrightness(batteryLevel);  // Met à jour la luminosité chaque fois que le niveau change
    });

    // Initialiser la batterie et ajuster la luminosité au lancement
    getBatteryStatus();

    // Nettoyage lors du démontage du composant
    return () => {
      batteryListener.remove();
    };
  }, []);  // Le tableau vide [] assure que l'effet est exécuté une seule fois au montage

  const backgroundColor = batteryLevel > 0.5 ? '#ADD8E6' : '#FFCC99';
  const textColor = batteryLevel > 0.5 ? '#000' : '#FFF';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Page d'accueil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
