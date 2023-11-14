import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { DEFAULT_PADDING } from '../../../../config/styles';
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
        <ScrollView contentContainerStyle={styles.container}>
            {friend ? (
                <View style={styles.textContainer}>
                    <Text style={styles.text} variant="headlineMedium">
                        {friend.name}
                    </Text>
                    <Text style={styles.text} variant="labelSmall">
                        {friend.id}
                    </Text>
                    <Text style={{ marginTop: DEFAULT_PADDING }} variant="bodyMedium">
                        {friend.description}
                    </Text>
                </View>
            ) : null}
            <LoadingSpinner isLoading={isLoading} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textContainer: {
        padding: DEFAULT_PADDING,
        width: '100%',
    },
    text: {
        textAlign: 'center',
    },
});
