import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UserInfoSignIn, authApiService } from '../../services/api/AuthApiService';
import UsernamePasswordForm from './components/UsernamePasswordForm';

type LoginScreenProps = {
    onLoginSuccess: (token: string) => void;
    onLoginFailure?: (error: Error) => void;
};

function LoginScreen({ onLoginSuccess, onLoginFailure }: LoginScreenProps) {
    const handleFormSubmit = (username: string, password: string) => {
        authApiService
            .signInUser(username, password)
            .then((userInfoSignIn: UserInfoSignIn) => {
                console.log('userInfoSignIn:', userInfoSignIn);
                onLoginSuccess(userInfoSignIn.token);
            })
            .catch((err: Error) => {
                console.log('error:', err);
                onLoginFailure?.(err);
            });
    };

    return (
        <View style={styles.container}>
            <UsernamePasswordForm action="Login" onSubmit={handleFormSubmit} />;
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
});

export default LoginScreen;
