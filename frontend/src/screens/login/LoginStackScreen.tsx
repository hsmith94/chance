import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createNativeStackNavigator();

export type LoginStackScreenProps = {
    onSignIn: () => void;
};

export default function LoginStackScreen({ onSignIn }: LoginStackScreenProps) {
    const setToken = (token: string) => {
        if (!token) {
            throw Error('Token is undefined');
        }
        localStorage.setItem('token', token);
    };

    const handleLoginSuccess = (token: string) => {
        setToken(token);
        onSignIn();
    };

    const handleLoginFailure = (error: Error) => {
        console.error('Login failure:', error);
    };

    const handleRegistrationFailure = (error: Error) => {
        console.error('Login failure:', error);
    };

    return (
        <Stack.Navigator initialRouteName="Register">
            <Stack.Screen
                name="Register"
                component={() => (
                    <RegisterScreen
                        onLoginSuccess={handleLoginSuccess}
                        onLoginFailure={handleLoginFailure}
                        onRegistrationFailure={handleRegistrationFailure}
                    />
                )}
            />
            <Stack.Screen
                name="Login"
                component={() => (
                    <LoginScreen onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
                )}
            />
        </Stack.Navigator>
    );
}
