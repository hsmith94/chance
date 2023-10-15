import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { UserInfoSignIn, authApiService } from '../../requests/AuthApiService';

type LoginScreenProps = {
    onLoginSuccess: (token: string) => void;
    onLoginFailure: (error: Error) => void;
};

function LoginScreen({ onLoginSuccess, onLoginFailure }: LoginScreenProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);

        authApiService
            .signInUser(username, password)
            .then((userInfoSignIn: UserInfoSignIn) => {
                console.log('userInfoSignIn:', userInfoSignIn);
                onLoginSuccess(userInfoSignIn.token);
            })
            .catch((err: Error) => {
                console.log('error:', err);
                onLoginFailure(err);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} />
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
    input: {
        width: '80%',
        marginBottom: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
    },
});

export default LoginScreen;
