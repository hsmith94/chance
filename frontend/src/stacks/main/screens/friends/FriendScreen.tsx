import { NavigationProp, Route } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { DEFAULT_PADDING } from '../../../../config/styles';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';
import { EDIT_FRIEND_SCREEN_NAV_TOKEN } from './EditFriendScreen';

export const FRIEND_SCREEN_NAV_TOKEN = 'Friend';

type FriendsScreenRouteParams = {
    friendId: string;
    updated?: string;
};

type FriendScreenProps = {
    route: Route<typeof FRIEND_SCREEN_NAV_TOKEN, FriendsScreenRouteParams>;
    navigation: NavigationProp<any>;
};

export default function FriendScreen({ route, navigation }: FriendScreenProps) {
    const { isLoading, setIsLoading } = useLoadingContext();
    const [friend, setFriend] = useState<Friend>();

    const { friendId, updated } = route.params;

    function loadFriend(friendId: string): void {
        setIsLoading(true);
        apiService
            .getFriend(friendId)
            .then((response) => {
                setFriend(response.friend);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    let lastUpdated = undefined;
    useEffect(() => {
        if (updated !== lastUpdated) {
            // Force-reload
            setFriend(undefined);
            loadFriend(friendId);
        }
    }, [updated]);

    useEffect(() => {
        loadFriend(friendId);
    }, [friendId]);

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
                    <Button onPress={() => navigation.navigate(EDIT_FRIEND_SCREEN_NAV_TOKEN, { friendId: friendId })}>
                        Edit
                    </Button>
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
