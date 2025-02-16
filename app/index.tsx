import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ruru Undercover</Text>
      <Button title="Crée une partie" onPress={() => router.push('/Game')} />
    </View>
  );
}
