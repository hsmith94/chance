import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text variant="displayLarge">Chance</Text>
            <View style={{ padding: 20 }}></View>
            <Button onPress={() => navigation.navigate('Friends')} mode="contained">
                Go to Friends
            </Button>
        </View>
    );
}
