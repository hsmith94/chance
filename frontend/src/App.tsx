import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { HEROKU_URL, LOCAL_URL } from './config/constants';
import { SettingsStackScreen } from './random';
import HomeStackScreen from './screens/HomeStackScreen';
import LoginStackScreen from './screens/login/LoginStackScreen';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, []);

    const linking = {
        prefixes: process.env.NODE_ENV === 'development' ? [LOCAL_URL] : [HEROKU_URL],
        config: {
            screens: {
                Login: 'login',
                Register: 'register',
                Home: '',
                Details: 'details/:itemId',
            },
        },
    };

    return (
        <NavigationContainer linking={linking}>
            {isSignedIn ? (
                <Tab.Navigator initialRouteName="Home">
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
            ) : (
                <LoginStackScreen onSignIn={() => setIsSignedIn(true)} />
            )}
        </NavigationContainer>
    );
}
