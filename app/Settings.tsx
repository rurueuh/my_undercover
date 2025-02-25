import {
  View,
  Text,
  Switch,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [badWordsCount, setBadWordsCount] = useState<number>(2);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [notificationsEnabled, badWordsCount]);

  const loadSettings = async () => {
    try {
      const notifications = await AsyncStorage.getItem('notificationsEnabled');
      const badWords = await AsyncStorage.getItem('badWordsCount');
      if (notifications !== null)
        setNotificationsEnabled(JSON.parse(notifications));
      if (badWords !== null) setBadWordsCount(JSON.parse(badWords));
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        'notificationsEnabled',
        JSON.stringify(notificationsEnabled)
      );
      await AsyncStorage.setItem(
        'badWordsCount',
        JSON.stringify(badWordsCount)
      );
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des paramètres', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Nombre de bad word</Text>
        <TextInput
          style={styles.input}
          value={String(badWordsCount)}
          onChangeText={(text) => {
            const value = parseInt(text, 10);
            setBadWordsCount(isNaN(value) ? 0 : value);
          }}
          keyboardType="numeric"
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
  input: {
    height: 40,
    width: 60,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#ffffff',
    textAlign: 'center',
  },
});
