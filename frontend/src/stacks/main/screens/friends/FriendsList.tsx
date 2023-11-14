import { ScrollView, View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import { DEFAULT_PADDING } from '../../../../config/styles';
import { Friend } from '../../../../models/Friend/Friend';
import { styles } from './FriendsListScreen';

type FriendsListProps = {
    friendsList: Friend[] | undefined;
    // TODO: FIXME: `navigation` probably shouldn't be passed in as a prop
    navigation;
    addNewFriend: () => void;
};

export function FriendsList({ friendsList, navigation, addNewFriend }: FriendsListProps) {
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
            <Button onPress={() => addNewFriend()} icon="plus" mode="contained">
                New Friend
            </Button>
        </>
    );
}
