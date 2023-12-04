import { EDIT_FRIEND_SCREEN_NAV_TOKEN } from './stacks/main/screens/friends/EditFriendScreen';
import { FRIEND_SCREEN_NAV_TOKEN } from './stacks/main/screens/friends/FriendScreen';
import { FRIENDS_LIST_SCREEN_NAV_TOKEN } from './stacks/main/screens/friends/FriendsListScreen';

export const SCREENS_MAPPING = {
    Login: 'login',
    Register: 'register',
    Home: '',
    Friends: 'friends',
    [FRIENDS_LIST_SCREEN_NAV_TOKEN]: 'my-friends',
    [FRIEND_SCREEN_NAV_TOKEN]: 'friend/:friendId',
    [EDIT_FRIEND_SCREEN_NAV_TOKEN]: 'edit-friend/:friendId',
    Settings: 'settings',
};
