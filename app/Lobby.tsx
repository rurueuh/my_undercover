import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Dialog, Portal, Provider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MAX_PLAYERS = 20;
const MIN_PLAYERS = 4;

export default function LobbyScreen() {
  const router = useRouter();
  const [players, setPlayers] = useState<{ name: string, image: string | null }[]>([]);
  const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [imageDialogVisible, setImageDialogVisible] = useState(false);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null);

  const addPlayer = async () => {
    if (players.length < MAX_PLAYERS) {
      const newNumber = getNextAvailableNumber(players);
      setPlayers([...players, { name: `Joueur ${newNumber}`, image: null }]);
    }
  };

  const getNextAvailableNumber = (playerList: { name: string, image: string | null }[]) => {
    for (let i = 1; i <= MAX_PLAYERS; i++) {
      if (!playerList.some(player => player.name === `Joueur ${i}`)) {
        return i;
      }
    }
    return playerList.length + 1;
  };

  const handlePlayerPress = (index: number) => {
    setSelectedPlayerIndex(index);
    setDialogVisible(true);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    setDialogVisible(false);
  };

  const openEditModal = () => {
    setEditingPlayerIndex(selectedPlayerIndex);
    setModalVisible(true);
    setDialogVisible(false);
  };

  const openImageDialog = () => {
    setImageDialogVisible(true);
    setDialogVisible(false);
  };

  const updatePlayerName = () => {
    if (editingPlayerIndex !== null && newPlayerName.trim() !== '') {
      setPlayers(prevPlayers => {
        const updatedPlayers = [...prevPlayers];
        updatedPlayers[editingPlayerIndex].name = newPlayerName;
        return updatedPlayers;
      });
      setEditingPlayerIndex(null);
      setNewPlayerName('');
      setModalVisible(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && selectedPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[selectedPlayerIndex].image = result.assets[0].uri;
      setPlayers(updatedPlayers);
    }
    setImageDialogVisible(false);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && selectedPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[selectedPlayerIndex].image = result.assets[0].uri;
      setPlayers(updatedPlayers);
    }
    setImageDialogVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Lobby</Text>
        <FlatList
          data={players}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handlePlayerPress(index)} style={styles.playerCard}>
              {item.image && <Image source={{ uri: item.image }} style={styles.playerImage} />}
              <Text style={styles.playerText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
        />
        <Button title="Commencer la partie" onPress={() => router.push('/Game')} disabled={players.length < MIN_PLAYERS} color="#bb86fc" />
        <Button title="Ajouter un joueur" onPress={addPlayer} disabled={players.length >= MAX_PLAYERS} color="#bb86fc" />
        
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title style={styles.dialogTitle}>Options du joueur</Dialog.Title>
            <Dialog.Content>
              <Button title="Modifier le nom" onPress={openEditModal} color="#bb86fc" />
              <Button title="Changer la photo" onPress={openImageDialog} color="#bb86fc" />
              <Button title="Supprimer" onPress={() => removePlayer(selectedPlayerIndex!)} color="#ff5555" />
              <Button title="Annuler" onPress={() => setDialogVisible(false)} color="#999999" />
            </Dialog.Content>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={imageDialogVisible} onDismiss={() => setImageDialogVisible(false)}>
            <Dialog.Title style={styles.dialogTitle}>Changer la photo</Dialog.Title>
            <Dialog.Content>
              <Button title="Prendre une photo" onPress={takePhoto} color="#bb86fc" />
              <Button title="Choisir depuis la galerie" onPress={pickImage} color="#bb86fc" />
              <Button title="Annuler" onPress={() => setImageDialogVisible(false)} color="#999999" />
            </Dialog.Content>
          </Dialog>
        </Portal>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier le nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Nouveau nom"
                placeholderTextColor="#999"
                value={newPlayerName}
                onChangeText={setNewPlayerName}
              />
              <Button title="Confirmer" onPress={updatePlayerName} color="#bb86fc" />
              <Button title="Annuler" onPress={() => setModalVisible(false)} color="#ff5555" />
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/Settings')}>
          <Ionicons name="settings" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </Provider>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  playerText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  dialogTitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
  playerCard: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 5,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: '#333',
    color: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 30,
  },
});