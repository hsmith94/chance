import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import LoadingSpinner from './components/LoadingSpinner';
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
            <LoadingSpinner isLoading={isLoading} />
        </LoadingProvider>
    );
}

const styles = StyleSheet.create({});
