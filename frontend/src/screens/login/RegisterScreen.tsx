import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserInfoSignIn, authApiService } from '../../services/api/AuthApiService';
import UsernamePasswordForm from './components/UsernamePasswordForm';

interface RegisterScreenProps {
    onRegistrationSuccess?: () => void;
    onRegistrationFailure?: (error: Error) => void;
    onLoginSuccess: (token: string) => void;
    onLoginFailure?: (error: Error) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
    onRegistrationSuccess,
    onRegistrationFailure,
    onLoginSuccess,
    onLoginFailure,
}) => {
    const handleFormSubmit = (username: string, password: string) => {
        authApiService
            .registerUser(username, password)
            .then(() => {
                onRegistrationSuccess?.();

                // Automatically sign in after registration
                authApiService
                    .signInUser(username, password)
                    .then((userInfoSignIn: UserInfoSignIn) => {
                        onLoginSuccess(userInfoSignIn?.token);
                    })
                    .catch((err: Error) => {
                        onLoginFailure?.(err);
                    });
            })
            .catch((err: Error) => {
                onRegistrationFailure?.(err);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <UsernamePasswordForm action="Register" onSubmit={handleFormSubmit} hasConfirmPassword={true} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default RegisterScreen;
