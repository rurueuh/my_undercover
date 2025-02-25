import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getWord, generateCard } from './card';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Player {
    name: string;
    image: string | null;
    turn: number;
    isMisterWhite: boolean;
    card: Card | null;
}

interface Card {
    word: string;
    isBad: boolean;
    player: string | null;
}

function generatePlayersTurn(players: Player[]) {
    do {
        players = players.sort(() => Math.random() - 0.5);
        players.forEach((player, index) => {
            player.turn = index + 1;
        });
    } while (players[0].card?.word === "Mister White");
    return players;
}

export default function GameScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    let [players, setPlayers] = useState<Player[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const [startGame, setStartGame] = useState<boolean>(false);

    
    useEffect(() => {
        const fetchBadWords = async () => {
            const badWords = await AsyncStorage.getItem('badWordsCount') ?? '2';
            const nbBadWords = parseInt(badWords);
            const { goodWord, badWord } = getWord();
            if (params.players) {
                let playersData: Player[] = JSON.parse(params.players as string);
                setPlayers(playersData);
                setCards(generateCard({ goodWord, badWord, nbBadWords, nbPlayers: playersData.length }));
                setLoading(false);
            }
        };
        fetchBadWords();
    }, [params.players]);

    const handleSelectCard = (index: number) => {
        if (cards[index].player) return;

        const updatedCards = [...cards];
        updatedCards[index].player = players[currentPlayerIndex].name;
        players[currentPlayerIndex].card = updatedCards[index];
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
            players = generatePlayersTurn(players);
            setStartGame(true);
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

    if (startGame) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Le jeu commence !</Text>
                    <Text style={styles.title}>ordre de passage : </Text>
                    {players.map((player, _) => (
                        <Text key={player.name} style={styles.title}>
                            {player.turn} - {player.name}
                        </Text>
                    ))}
                    <Button
                        title="Commencer le jeu"
                        onPress={() => {
                            router.push({ pathname: "/GameTurn", params: { players: JSON.stringify(players) } });
                        }}
                    />
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
                                {/* if card is mister white say "Tu es le mister white" else "Tu as le mot : {word}" */}
                                <Text style={styles.modalText}>
                                    {selectedCard?.word === "Mister White" ? "Tu es le Mister White" : `Tu as le mot : ${selectedCard?.word}`}
                                </Text>
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
