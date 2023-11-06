import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { LOCAL_URL, PUBLIC_URL } from './config/constants';
import { ENV } from './config/environment';
import { LoadingProvider, useLoadingContext } from './contexts/Loading/LoadingProvider';
import { SettingsStackScreen } from './random';
import FriendsStackScreen from './screens/friends/FriendsStackScreen';
import HomeStackScreen from './screens/home/HomeStackScreen';
import LoginStackScreen from './screens/login/LoginStackScreen';
import { SCREENS_MAPPING } from './screens/screens-mapping';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    const { isLoading } = useLoadingContext();
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }, []);

    const linking: LinkingOptions<typeof SCREENS_MAPPING> = {
        prefixes: ENV === 'development' ? [LOCAL_URL] : [PUBLIC_URL],
        config: {
            screens: SCREENS_MAPPING,
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
            {isLoading ? (
                <View style={styles.backdrop}>
                    <ActivityIndicator size={120} style={styles.spinner} />
                </View>
            ) : null}
        </LoadingProvider>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        backdropFilter: 'brightness(0.2) blur(20px)',
        opacity: 0.5,
        zIndex: 998,
    },
    spinner: {
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
