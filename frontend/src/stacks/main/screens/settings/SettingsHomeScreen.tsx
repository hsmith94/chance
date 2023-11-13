import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import AuthSession from '../../../../services/auth/AuthSession';

type SettingsHomeScreenProps = {
    onSignOut: () => void;
};

export default function SettingsHomeScreen({ onSignOut }: SettingsHomeScreenProps) {
    function logOut() {
        AuthSession.removeToken();
        onSignOut();
    }

    return (
        <View style={styles.container}>
            <Button onPress={() => logOut()} icon="logout">
                Log Out
            </Button>
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
