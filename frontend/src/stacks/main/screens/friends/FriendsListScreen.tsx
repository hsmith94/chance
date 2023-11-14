import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';

const DEFAULT_PADDING = 20;

type FriendsListProps = {
    friendsList: Friend[];
    // TODO: FIXME: `navigation` probably shouldn't be passed in as a prop
    navigation;
    addNewFriend: () => void;
};

function FriendsList({ friendsList, navigation, addNewFriend }: FriendsListProps) {
    const hasFriendsList = friendsList && friendsList.length > 0;

    const renderFriendsList = () => {
        return (
            <List.Section style={styles.list}>
                <List.Subheader>My Friends</List.Subheader>
                {friendsList.map((friend: Friend) => (
                    <List.Item
                        key={friend.id}
                        onPress={() =>
                            navigation.navigate('Friend', {
                                friendId: friend.id,
                            })
                        }
                        title={friend.name}
                        left={() => <List.Icon icon="account-circle" style={{ paddingLeft: DEFAULT_PADDING }} />}
                    />
                ))}
            </List.Section>
        );
    };

    const renderEmptyListMessage = () => {
        return (
            <View style={{ padding: DEFAULT_PADDING }}>
                <Text variant="bodyMedium">No friends yet!</Text>
                <Text variant="bodySmall">Use the button below to add one!</Text>
            </View>
        );
    };

    return (
        <>
            <ScrollView style={{ width: '100%' }}>
                {hasFriendsList ? renderFriendsList() : renderEmptyListMessage()}
            </ScrollView>
            <Button onPress={() => addNewFriend()} icon="plus">
                New Friend
            </Button>
        </>
    );
}

export default function FriendsListScreen({ navigation }) {
    const { isLoading, setIsLoading } = useLoadingContext();

    const [friendsList, setFriendsList] = useState<Friend[]>([]);

    const hasFriendsList = friendsList && friendsList.length > 0;

    useEffect(() => {
        function loadFriendsList() {
            setIsLoading(true);
            apiService
                .getFriendsList()
                .then((response) => {
                    setFriendsList(response.friends);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        if (!hasFriendsList) {
            loadFriendsList();
        }
    }, []);

    async function addNewFriend() {
        console.log('Adding new friend!');
        // showNewFriendModal();
        await apiService.createFriend({ name: 'New Friend' }).then((response) => {
            console.log('Created new friend!');
            navigation.navigate('Friend', {
                friendId: response.friendId,
            });
        });
    }

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <FriendsList friendsList={friendsList} navigation={navigation} addNewFriend={addNewFriend} />
            ) : null}
            <LoadingSpinner isLoading={isLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
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
