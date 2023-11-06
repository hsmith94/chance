import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { useLoadingContext } from '../../contexts/Loading/LoadingProvider';
import { Friend } from '../../models/Friend/Friend';

export default function FriendsScreen({ navigation }) {
    const { isLoading, setIsLoading } = useLoadingContext();

    const friendsList: Friend[] = [
        {
            id: '1',
            name: 'John Doe',
        },
        {
            id: '2',
            name: 'Jane Doe',
        },
        {
            id: '3',
            name: 'John Smith',
        },
        {
            id: '4',
            name: 'Jane Smith',
        },
        {
            id: '5',
            name: 'John Doe',
        },
        {
            id: '6',
            name: 'Jane Doe',
        },
    ];

    if (!isLoading) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2 * 1000);
    }

    return (
        <View style={styles.container}>
            <List.Section style={styles.list}>
                <List.Subheader>My Friends</List.Subheader>
                {friendsList.map((friend, index) => (
                    <List.Item
                        onPress={() =>
                            navigation.navigate('Friend', {
                                friendId: friend.id,
                            })
                        }
                        title={friend.name}
                        left={() => <List.Icon icon="account-circle" />}
                    />
                ))}
            </List.Section>
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
    },
    list: {
        flex: 1,
        width: '100%',
    },
});
