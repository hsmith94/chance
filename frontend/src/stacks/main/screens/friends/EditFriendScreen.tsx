import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { DEFAULT_PADDING } from '../../../../config/styles';
import { useLoadingContext } from '../../../../contexts/Loading/LoadingProvider';
import { Friend } from '../../../../models/Friend/Friend';
import { apiService } from '../../../../services/api/ApiService';
import { FRIEND_SCREEN_NAV_TOKEN } from './FriendScreen';

export const EDIT_FRIEND_SCREEN_NAV_TOKEN = 'Edit-Friend';

export default function EditFriendScreen({ route, navigation }) {
    const { isLoading, setIsLoading } = useLoadingContext();
    const [nameText, setNameText] = useState<string>();
    const [descriptionText, setDescriptionText] = useState<string>();

    const { friendId } = route.params;

    useEffect(() => {
        setIsLoading(true);
        apiService
            .getFriend(friendId)
            .then((response) => {
                const friends = response.friend;
                setNameText(friends.name);
                setDescriptionText(friends.description);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    function getFriend(): Friend {
        if (!nameText) {
            throw Error('Name is required');
        }
        return {
            id: friendId,
            name: nameText,
            description: descriptionText,
            // picture: undefined, // TODO:
        };
    }

    function saveFriend() {
        setIsLoading(true);
        apiService
            .updateFriend(friendId, getFriend())
            .then((response) => {
                navigation.navigate(FRIEND_SCREEN_NAV_TOKEN, { friendId: friendId, updated: response.updatedOn });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!isLoading ? (
                <View style={styles.textContainer}>
                    <TextInput
                        label="Name"
                        value={nameText}
                        onChangeText={(text: string) => setNameText(text)}
                    ></TextInput>
                    <TextInput
                        label="Description"
                        value={descriptionText}
                        onChangeText={(text: string) => setDescriptionText(text)}
                    ></TextInput>
                    <Button onPress={() => saveFriend()}>Save</Button>
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
