import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accueil</Text>
      <Button title="Aller à Explorer" onPress={() => router.push('/Game')} />
    </View>
  );
}

export const options = {
  headerShown: false,
};