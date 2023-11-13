import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsHomeScreen from './SettingsHomeScreen';

type SettingsStackScreenProps = {
    onSignOut: () => void;
};

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackScreen({ onSignOut }: SettingsStackScreenProps) {
    return (
        <SettingsStack.Navigator initialRouteName="Settings-Home">
            <SettingsStack.Screen
                name="Settings-Home"
                component={() => <SettingsHomeScreen onSignOut={onSignOut} />}
                options={{ title: 'Settings' }}
            />
        </SettingsStack.Navigator>
    );
}
