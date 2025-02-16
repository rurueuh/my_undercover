import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function GameScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#ffffff' }}>Ruru Game</Text>
            <Button title="Crée une partie" onPress={() => router.push('/Game')} />
        </View>
    );
}