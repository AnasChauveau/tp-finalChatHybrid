// app/(tabs)/click.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ClickScreen() {
  const [counterDog, setCounterDog] = useState(0);  // Compteur de chien
  const [counterCat, setCounterCat] = useState(0);  // Compteur de chat

  const resetCounters = () => {
    setCounterDog(0);
    setCounterCat(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page de Clic</Text>
      <Text style={styles.text}>Compteur de chien : {counterDog}</Text>
      <Text style={styles.text}>Compteur de chat : {counterCat}</Text>

      <Button title="Réinitialiser les compteurs" onPress={resetCounters} />
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
    marginBottom: 10,
  },
});
