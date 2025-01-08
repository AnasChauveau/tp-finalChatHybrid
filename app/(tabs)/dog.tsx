import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';
import axios from 'axios';
import * as SMS from 'expo-sms';  // Importation du module expo-sms
import { useRouter } from 'expo-router';  // Pour la navigation

export default function DogScreen({ navigation }: { navigation: any }) {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [counterDog, setCounterDog] = useState(0);  // Compteur pour les visites du bouton chien
  const [counterCat, setCounterCat] = useState(0);  // Compteur pour les visites du bouton chat

  const router = useRouter();

  useEffect(() => {
    const adjustBrightness = async (level: number) => {
      if (level > 0.5) {
        await Brightness.setSystemBrightnessAsync(1);
      } else {
        await Brightness.setSystemBrightnessAsync(0.2);
      }
    };

    const getBatteryStatus = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
      adjustBrightness(level);
    };

    const batteryListener = Battery.addBatteryLevelListener((batteryInfo) => {
      const { batteryLevel } = batteryInfo;
      setBatteryLevel(batteryLevel);
      adjustBrightness(batteryLevel);
    });

    getBatteryStatus();

    const fetchDogImage = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogImage(response.data.message);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'image du chien:', error);
      }
    };

    fetchDogImage();

    return () => {
      batteryListener.remove();
    };
  }, []);

  const sendSms = async () => {
    const { result } = await SMS.sendSMSAsync(
      ['0606060606'],
      'Je n\'aime pas les chats'  // Message à envoyer
    );
    console.log('Résultat du SMS:', result);  // Affiche le résultat dans la console
  };

  const backgroundColor = batteryLevel > 0.5 ? '#ADD8E6' : '#FFCC99';
  const textColor = batteryLevel > 0.5 ? '#000' : '#FFF';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Dog Screen</Text>
      {dogImage && (
        <Image
          source={{ uri: dogImage }}
          style={styles.dogImage}
        />
      )}
      <Button
        title="Appuyer pour chien"
        onPress={() => {
          setCounterDog(counterDog + 1);  // Incrémente le compteur du chien
          sendSms();  // Envoie le SMS
          router.replace('./click');  // Navigation vers la page Click pour afficher le compteur
        }}
      />
      <Text style={[styles.text, { color: textColor }]}>Compteur de chien : {counterDog}</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dogImage: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
});
