import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [isDarkMode, notificationsEnabled, soundEnabled]);

  const loadSettings = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('isDarkMode');
      const notifications = await AsyncStorage.getItem('notificationsEnabled');
      const sound = await AsyncStorage.getItem('soundEnabled');
      if (darkMode !== null) setIsDarkMode(JSON.parse(darkMode));
      if (notifications !== null) setNotificationsEnabled(JSON.parse(notifications));
      if (sound !== null) setSoundEnabled(JSON.parse(sound));
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
      await AsyncStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des paramètres', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      
      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Mode sombre</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Son activé</Text>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
        />
      </View>
      
      <Button title="Retour" onPress={() => router.back()} color="#bb86fc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
    color: '#ffffff',
  },
});
