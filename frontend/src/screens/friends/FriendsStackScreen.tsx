import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsScreen from './FriendsScreen';

const FriendsStack = createNativeStackNavigator();

export default function FriendsStackScreen() {
    return (
        <FriendsStack.Navigator initialRouteName="My-Friends">
            <FriendsStack.Screen name="My-Friends" component={FriendsScreen} options={{ title: 'My Friends' }} />
        </FriendsStack.Navigator>
    );
}
