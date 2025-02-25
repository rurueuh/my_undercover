import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { Button } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Card {
    word: string;
    isBad: boolean;
    player: string | null;
}

interface Player {
    name: string;
    image: string | null;
    turn: number;
    isMisterWhite: boolean;
    card: Card | null;
}

export default function GameTurnScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [players, setPlayers] = useState<Player[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedCardWord, setSelectedCardWord] = useState<string>('');

    useEffect(() => {
        if (params.players) {
            let playersData: Player[] = JSON.parse(params.players as string);
            setPlayers(playersData);
            setLoading(false);
        }
    }, [params.players]);

    const handlePlayerPress = (player: Player) => {
        if (player.card?.word) {
            setSelectedCardWord(player.card.word);
        } else {
            setSelectedCardWord('No card');
        }
        setModalVisible(true);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <Text style={styles.title}>
                    faites un tour puis éliminer un joueur
                </Text>
            </View>
        );
    } else {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.listContainer}>
                        <Text style={styles.title}>Séléctionner le joueur a éliminer</Text>
                        <FlatList
                            data={players}
                            keyExtractor={(item) => item.name}
                            numColumns={3}
                            contentContainerStyle={styles.flatListContainer}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handlePlayerPress(item)}
                                    style={styles.playerCard}
                                >
                                    {item.image && (
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.playerImage}
                                            resizeMode="cover"
                                        />
                                    )}
                                    <Text style={styles.playerName}>{item.name}</Text>
                                    <Text style={styles.cardText}>{item.turn}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button mode="contained" onPress={() => { router.dismissAll(); router.push('Lobby'); }}>
                            Fin de la partie
                        </Button>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalText}>{selectedCardWord}</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Text style={styles.closeText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider >
        );
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
    },
    listContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerCard: {
        width: 100,
        height: 160,
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
    playerName: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    cardText: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
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
        textAlign: 'center',
    },
    closeText: {
        fontSize: 18,
        color: 'blue',
    },
});
