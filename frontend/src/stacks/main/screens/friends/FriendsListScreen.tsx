import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { LIPSUM } from '../../../../config/constants';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend, FriendMetadata } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';
import { generateRandomName } from '../../../../services/names';
import { FriendsList } from './FriendsList';

export default function FriendsListScreen({ navigation }) {
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
                navigation.navigate('Friend', {
                    friendId: response.friendId,
                });
                await loadFriendsList();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (!hasFriendsList) {
            loadFriendsList();
        }
    }, [friendsList]);

    return (
        <View style={styles.container}>
            {!isLoading && hasFriendsList ? (
                <FriendsList friendsList={friendsList} navigation={navigation} addNewFriend={addNewFriend} />
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
