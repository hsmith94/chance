import { NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { LIPSUM } from '../../../../config/constants';
import { DEFAULT_PADDING } from '../../../../config/styles';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend, FriendMetadata } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';
import { generateRandomName, pickRandomFriend } from '../../../../services/random/random';
import { EDIT_FRIEND_SCREEN_NAV_TOKEN } from './EditFriendScreen';
import { FRIEND_SCREEN_NAV_TOKEN } from './FriendScreen';
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

    function goToRandomFriend() {
        if (!friendsList) {
            throw Error('Friends list is undefined');
        }
        const randomFriend = pickRandomFriend(friendsList);
        navigation.navigate(FRIEND_SCREEN_NAV_TOKEN, {
            friendId: randomFriend.id,
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
                <>
                    <Button style={styles.randomFriendButton} onPress={() => goToRandomFriend()} mode="outlined">
                        Random Friend
                    </Button>
                    <FriendsList
                        friendsList={friendsList}
                        navigation={navigation}
                        addNewFriend={addNewFriend}
                        deleteFriend={deleteFriend}
                    />
                </>
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
    randomFriendButton: {
        marginTop: DEFAULT_PADDING,
        marginBottom: DEFAULT_PADDING,
    },
});
