import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import HomeScreen from './screens/home/HomeScreen';

const SettingsStack = createNativeStackNavigator();

export function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator initialRouteName="Home">
            <SettingsStack.Screen name="Home" component={HomeScreen} options={{ title: 'Settings' }} />
            <SettingsStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Details' }}
                initialParams={{ itemId: 0 }}
            />
        </SettingsStack.Navigator>
    );
}

export function DetailsScreen({ route, navigation }) {
    const { itemId } = route?.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {itemId}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go to Home (push)" onPress={() => navigation.push('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()} />
        </View>
    );
}
