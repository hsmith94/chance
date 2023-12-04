import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { LIPSUM } from '../../../../config/constants';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend, FriendMetadata } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';
import { generateRandomName } from '../../../../services/names';
import { EDIT_FRIEND_SCREEN_NAV_TOKEN } from './EditFriendScreen';
import { FriendsList } from './FriendsList';

export const FRIENDS_LIST_SCREEN_NAV_TOKEN = 'My-Friends';

export type FriendsListScreenProps = {
    navigation: NavigationProp<any>;
};

export default function FriendsListScreen({ navigation }: FriendsListScreenProps) {
    const { isLoading, setIsLoading } = useLoadingContext();

    const [friendsList, setFriendsList] = useState<Friend[] | undefined>(undefined);

    const hasFriendsList = friendsList && friendsList.length > 0;

    async function loadFriendsList() {
        setIsLoading(true);
        await apiService
            .getFriendsList()
            .then((response) => {
                setFriendsList(response.friends);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    async function addNewFriend() {
        const randomName = generateRandomName();

        const friend: FriendMetadata = {
            name: randomName,
            description: LIPSUM,
            picture: undefined,
        };

        setIsLoading(true);
        await apiService
            .createFriend(friend)
            .then(async (response) => {
                navigation.navigate(EDIT_FRIEND_SCREEN_NAV_TOKEN, {
                    friendId: response.friendId,
                });
                await loadFriendsList();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    async function deleteFriend(friendId: string) {
        setIsLoading(true);
        await apiService
            .deleteFriend(friendId)
            .then(async () => {
                await loadFriendsList();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (!hasFriendsList && !isLoading) {
            loadFriendsList();
        }
    }, []);

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <FriendsList
                    friendsList={friendsList}
                    navigation={navigation}
                    addNewFriend={addNewFriend}
                    deleteFriend={deleteFriend}
                />
            ) : null}
            <LoadingSpinner isLoading={isLoading} />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    button: {},
    list: {
        flex: 1,
        width: '100%',
    },
});
