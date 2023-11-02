import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { HEROKU_URL, LOCAL_URL } from './config/constants';
import { LoadingProvider, useLoadingContext } from './contexts/Loading/LoadingProvider';
import { SettingsStackScreen } from './random';
import FriendsStackScreen from './screens/friends/FriendsStackScreen';
import HomeStackScreen from './screens/home/HomeStackScreen';
import LoginStackScreen from './screens/login/LoginStackScreen';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const [isLoading] = useLoadingContext();
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
        <LoadingProvider>
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
                            name="Friends"
                            component={FriendsStackScreen}
                            options={{
                                tabBarIcon: 'heart',
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
            {isLoading ? <ActivityIndicator animating={true} style={styles.loading} /> : null}
        </LoadingProvider>
    );
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});
