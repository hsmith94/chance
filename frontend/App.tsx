import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';

function DetailsScreen({ route, navigation }) {
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

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
        </View>
    );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
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

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <HomeStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Details' }}
                initialParams={{ itemId: 0 }}
            />
        </HomeStack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const HEROKU_URL = 'https://chance-application-29c18a348dbe.herokuapp.com';
    const linking = {
        prefixes: process.env.NODE_ENV === 'development' ? ['http://localhost:19006'] : [HEROKU_URL],
        config: {
            screens: {
                Home: '',
                Details: 'details/:itemId',
            },
        },
    };
    return (
        <NavigationContainer linking={linking}>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: 'home',
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsStackScreen}
                    options={{
                        tabBarIcon: 'cog',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
