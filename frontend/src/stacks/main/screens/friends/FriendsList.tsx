import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, List, Text } from 'react-native-paper';
import { DEFAULT_PADDING } from '../../../../config/styles';
import { Friend } from '../../../../models/Friend/Friend';
import { FRIEND_SCREEN_NAV_TOKEN } from './FriendScreen';

type FriendsListProps = {
    friendsList: Friend[] | undefined;
    // TODO: FIXME: `navigation` probably shouldn't be passed in as a prop
    navigation;
    addNewFriend: () => void;
    deleteFriend: (friendId: string) => void;
};

export function FriendsList({ friendsList, navigation, addNewFriend, deleteFriend }: FriendsListProps) {
    const hasFriendsList = friendsList && friendsList.length > 0;

    const renderFriendsList = () => {
        if (!friendsList) {
            throw Error('Friends list is undefined');
        }
        return (
            <List.Section style={styles.list}>
                <List.Subheader>My Friends</List.Subheader>
                {friendsList.map((friend: Friend) => (
                    <List.Item
                        key={friend.id}
                        onPress={() =>
                            navigation.navigate(FRIEND_SCREEN_NAV_TOKEN, {
                                friendId: friend.id,
                            })
                        }
                        title={friend.name}
                        left={() => <List.Icon icon="account-circle" style={{ paddingLeft: DEFAULT_PADDING }} />}
                        right={() => <IconButton icon="delete" size={20} onPress={() => deleteFriend(friend.id)} />}
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
            <Button style={styles.newFriendButton} onPress={() => addNewFriend()} icon="plus" mode="contained">
                New Friend
            </Button>
        </>
    );
}

export const styles = StyleSheet.create({
    list: {
        flex: 1,
        width: '100%',
    },
    newFriendButton: {
        marginTop: DEFAULT_PADDING,
        marginBottom: DEFAULT_PADDING,
    },
});
