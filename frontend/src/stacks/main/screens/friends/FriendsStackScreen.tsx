import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditFriendScreen, { EDIT_FRIEND_SCREEN_NAV_TOKEN } from './EditFriendScreen';
import FriendScreen, { FRIEND_SCREEN_NAV_TOKEN } from './FriendScreen';
import FriendsListScreen, { FRIENDS_LIST_SCREEN_NAV_TOKEN } from './FriendsListScreen';

const FriendsStack = createNativeStackNavigator();

export default function FriendsStackScreen() {
    return (
        <FriendsStack.Navigator initialRouteName={FRIENDS_LIST_SCREEN_NAV_TOKEN}>
            <FriendsStack.Screen
                name={FRIENDS_LIST_SCREEN_NAV_TOKEN}
                component={FriendsListScreen as any}
                options={{ title: 'My Friends' }}
            />
            <FriendsStack.Screen
                name={FRIEND_SCREEN_NAV_TOKEN}
                component={FriendScreen as any}
                options={{ title: 'Friend' }}
            />
            <FriendsStack.Screen
                name={EDIT_FRIEND_SCREEN_NAV_TOKEN}
                component={EditFriendScreen as any}
                options={{ title: 'Edit Friend' }}
            />
        </FriendsStack.Navigator>
    );
}
