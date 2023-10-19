import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { PASSWORD_MIN_LENGTH } from '../../../config/constants';
import { ER_PASSWORDS_DO_NOT_MATCH, ER_PASSWORD_TOO_SHORT } from '../errors';

type UsernamePasswordFormProps = {
    action: string;
    hasConfirmPassword?: boolean;
    onSubmit: (username: string, password: string) => void;
};

function UsernamePasswordForm({ action, onSubmit, hasConfirmPassword }: UsernamePasswordFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    hasConfirmPassword = hasConfirmPassword ?? false;

    const handleSubmit = () => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            throw Error(ER_PASSWORD_TOO_SHORT);
        }
        if (hasConfirmPassword && password !== confirmPassword) {
            throw Error(ER_PASSWORDS_DO_NOT_MATCH);
        }
        onSubmit(username, password);
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
            {hasConfirmPassword ? (
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                />
            ) : null}
            <Button title={action} onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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

export default UsernamePasswordForm;
