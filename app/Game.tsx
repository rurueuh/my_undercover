import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getWord, generateCard } from './card';

interface Player {
    name: string;
}

interface Card {
    word: string;
    isBad: boolean;
    player: string | null;
}

export default function GameScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [players, setPlayers] = useState<Player[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const NB_BAD_WORDS = 1;
    const { goodWord, badWord } = getWord();

    useEffect(() => {
        if (params.players) {
            let playersData: Player[] = JSON.parse(params.players as string);
            setPlayers(playersData);
            setCards(generateCard({ goodWord, badWord, nbBadWords: NB_BAD_WORDS, nbPlayers: playersData.length }));
            setLoading(false);
        }
    }, [params.players]);

    const handleSelectCard = (index: number) => {
        if (cards[index].player) return; // Empêche de choisir une carte déjà attribuée

        const updatedCards = [...cards];
        updatedCards[index].player = players[currentPlayerIndex].name;
        setCards(updatedCards);
        setSelectedCard(updatedCards[index]);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedCard(null);
        if (currentPlayerIndex < players.length - 1) {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        } else {
            console.log("Tous les joueurs ont leur carte, début du jeu !");
        }
    };

    if (loading) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Loading...</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Au tour de {players[currentPlayerIndex].name} de choisir</Text>
                    <FlatList
                        data={cards}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => handleSelectCard(index)} style={styles.playerCard}>
                                <Text style={styles.cardText}>{item.player ? "✔️" : "?"}</Text>
                            </TouchableOpacity>
                        )}
                        numColumns={3}
                        contentContainerStyle={styles.listContainer}
                    />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleCloseModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Ton mot : {selectedCard?.word}</Text>
                                <Button title="OK" onPress={handleCloseModal} />
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 10,
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
    cardText: {
        fontSize: 24,
        color: '#ffffff',
    },
    listContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
});
