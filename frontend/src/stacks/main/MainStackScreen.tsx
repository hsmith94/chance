import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FriendsStackScreen from './screens/friends/FriendsStackScreen';
import HomeStackScreen from './screens/home/HomeStackScreen';
import SettingsStackScreen from './screens/settings/SettingsStackScreen';

type MainStackScreenProps = {
    onSignOut: () => void;
};

export const Tab = createMaterialBottomTabNavigator();

export function MainStackScreen({ onSignOut }: MainStackScreenProps) {
    return (
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
                component={() => <SettingsStackScreen onSignOut={onSignOut} />}
                options={{
                    tabBarIcon: 'cog',
                }}
            />
        </Tab.Navigator>
    );
}
