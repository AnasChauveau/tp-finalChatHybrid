import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';  // Importation du module expo-brightness
import { Audio } from 'expo-av';  // Importation du module pour gérer l'audio

export default function ChatScreen() {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [clickCount, setClickCount] = useState(0);  // Compteur de clics
  const [sound, setSound] = useState<any>(null);  // État pour le son

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

  // Fonction pour jouer un son de chat
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/chat-sound.mp3') // Remplace par le chemin de ton fichier audio
    );
    setSound(sound);
    await sound.playAsync();  // Joue le son
  };

  // Fonction pour gérer le clic sur la page Chat
  const handleChatClick = () => {
    setClickCount(clickCount + 1);  // Incrémente le compteur de clics
    playSound();  // Joue le son du chat à chaque clic
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity onPress={handleChatClick} style={styles.touchableContainer}>
        <Text style={[styles.text, { color: textColor }]}>Chat Screen</Text>
        <Text style={[styles.counterText, { color: textColor }]}>
          Nombre de clics : {clickCount}
        </Text>
        <Image
          source={require('../../assets/chat-image.png')} // Remplace par le chemin de l'image de ton chat
          style={styles.image}
        />
      </TouchableOpacity>
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
  counterText: {
    fontSize: 18,
    marginTop: 10,
  },
  touchableContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
