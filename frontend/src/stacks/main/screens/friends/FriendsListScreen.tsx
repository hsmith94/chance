import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
        return friendsList.map((friend: Friend, index: number) => (
            <List.Item
                key={index}
                onPress={() =>
                    navigation.navigate('Friend', {
                        friendId: friend.id,
                    })
                }
                title={friend.name}
                left={() => <List.Icon icon="account-circle" style={{ paddingLeft: DEFAULT_PADDING }} />}
            />
        ));
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
            <List.Section style={styles.list}>
                <List.Subheader>My Friends</List.Subheader>
                {hasFriendsList ? renderFriendsList() : renderEmptyListMessage()}
            </List.Section>
            <Button onPress={() => addNewFriend()} icon="plus">
                New Friend
            </Button>
        </>
    );
}

export default function FriendsListScreen({ navigation }) {
    const { isLoading, setIsLoading } = useLoadingContext();

    // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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

    // const showNewFriendModal = () => setIsModalVisible(true);
    // const hideNewFriendModal = () => setIsModalVisible(false);

    function addNewFriend() {
        console.log('Adding new friend!');
        // showNewFriendModal();
    }

    // return (
    //     <>
    //         <PaperProvider>
    //             <Portal>
    //                 <Modal
    //                     visible={isModalVisible}
    //                     onDismiss={hideNewFriendModal}
    //                     contentContainerStyle={styles.modalContentContainer}
    //                 >
    //                     <NewFriendModalContent />
    //                 </Modal>
    //             </Portal>
    //             <FriendsList friendsList={friendsList} navigation={navigation} addNewFriend={addNewFriend} />
    //         </PaperProvider>
    //         <LoadingSpinner isLoading={isLoading} />
    //     </>
    // );

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
    // modalContentContainer: {
    //     padding: DEFAULT_PADDING,
    //     backgroundColor: 'white',
    //     // FIXME: It's probably not right to apply these styles here
    //     width: '80%',
    //     left: '50%',
    //     transform: [{ translateX: '-50%' as any }],
    // },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
    },
});
