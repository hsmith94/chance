import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { UserInfoSignIn, authApiService } from '../../../services/api/AuthApiService';
import UsernamePasswordForm from '../components/UsernamePasswordForm';
import { ER_NO_TOKEN } from '../errors';

interface RegisterScreenProps {
    navigation;
    onRegistrationSuccess: () => void;
    onRegistrationFailure: (error: Error) => void;
    onLoginSuccess: (token: string) => void;
    onLoginFailure: (error: Error) => void;
}

export default function RegisterScreen({
    navigation,
    onRegistrationSuccess,
    onRegistrationFailure,
    onLoginSuccess,
    onLoginFailure,
}: RegisterScreenProps) {
    const handleFormSubmit = (username: string, password: string) => {
        authApiService
            .registerUser(username, password)
            .then(() => {
                onRegistrationSuccess();

                // Automatically sign in after registration
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
            })
            .catch((err: Error) => {
                onRegistrationFailure(err);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <UsernamePasswordForm action="Register" onSubmit={handleFormSubmit} hasConfirmPassword={true} />

            <View style={styles.divider}></View>
            <Text>Already have an account?</Text>
            <Button onPress={() => navigation.replace('Login')}>Log In</Button>
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
