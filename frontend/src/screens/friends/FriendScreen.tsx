import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useLoadingContext } from '../../contexts/Loading/LoadingProvider';

export default function FriendScreen({ route, navigation }) {
    const { isLoading, setIsLoading } = useLoadingContext();

    const { friendId } = route.params;

    const friend = {
        id: friendId,
        name: '< name goes here >', // TODO: Fetch this from backend
    };

    if (!isLoading) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2 * 1000);
    }

    return (
        <View style={styles.container}>
            <Text>{friend.name}</Text>
            <Text>{friend.id}</Text>
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
});
