import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { UserInfoSignIn, authApiService } from '../../../services/api/AuthApiService';
import UsernamePasswordForm from '../components/UsernamePasswordForm';
import { ER_NO_TOKEN } from '../errors';

type LoginScreenProps = {
    navigation;
    onLoginSuccess: (token: string) => void;
    onLoginFailure: (error: Error) => void;
};

function LoginScreen({ navigation, onLoginSuccess, onLoginFailure }: LoginScreenProps) {
    const handleFormSubmit = (username: string, password: string) => {
        authApiService
            .signInUser(username, password)
            .then((userInfoSignIn: UserInfoSignIn) => {
                if (!userInfoSignIn?.token) {
                    throw new Error(ER_NO_TOKEN);
                }
                onLoginSuccess(userInfoSignIn.token);
            })
            .catch((err: Error) => {
                onLoginFailure(err);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Log In</Text>
            <UsernamePasswordForm action="Login" onSubmit={handleFormSubmit} />

            <View style={styles.divider}></View>
            <Text>Don't have an account?</Text>
            <Button onPress={() => navigation.replace('Register')}>Register</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        opacity: 0.3,
        marginVertical: 16,
    },
});

export default LoginScreen;
