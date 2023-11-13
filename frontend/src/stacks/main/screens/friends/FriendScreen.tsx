import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';

export default function FriendScreen({ route, navigation }) {
    const { isLoading, setIsLoading } = useLoadingContext();
    const [friend, setFriend] = useState<Friend>();

    const { friendId } = route.params;

    useEffect(() => {
        setIsLoading(true);
        apiService
            .getFriend(friendId)
            .then((response) => {
                setFriend(response.friend);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            {friend ? (
                <>
                    <Text variant="headlineMedium">{friend.name}</Text>
                    <Text variant="labelSmall">{friend.id}</Text>
                </>
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
    },
});
