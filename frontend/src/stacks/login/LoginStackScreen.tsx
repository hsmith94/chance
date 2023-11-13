import { createNativeStackNavigator } from '@react-navigation/native-stack';
import _ from 'lodash';
import AuthSession from '../../services/auth/AuthSession';
import { VALIDATION_ERRORS } from './errors';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export type LoginStackScreenProps = {
    onSignIn: () => void;
};

export default function LoginStackScreen({ onSignIn }: LoginStackScreenProps) {
    const setToken = (token: string) => {
        AuthSession.setToken(token);
    };

    const handleLoginSuccess = (token: string) => {
        setToken(token);
        onSignIn();
    };

    const handleLoginFailure = (error: Error) => {
        console.error('Login failure:', error);

        // Show feedback to user
        if (VALIDATION_ERRORS.includes(error.message)) {
            alert('Login failed: ' + error.message);
        } else {
            alert('Login failed: An internal error occurred');
        }
    };

    const handleRegistrationFailure = (error: Error) => {
        console.error('Registration/login failure:', error);

        // Show feedback to user
        if (VALIDATION_ERRORS.includes(error.message)) {
            alert('Login failed: ' + error.message);
        } else {
            alert('Login failed: An internal error occurred');
        }
    };

    return (
        <Stack.Navigator initialRouteName="Register">
            <Stack.Screen
                name="Register"
                component={({ navigation }) => (
                    <RegisterScreen
                        navigation={navigation}
                        onLoginSuccess={handleLoginSuccess}
                        onLoginFailure={handleLoginFailure}
                        onRegistrationFailure={handleRegistrationFailure}
                        onRegistrationSuccess={_.noop}
                    />
                )}
            />
            <Stack.Screen
                name="Login"
                component={({ navigation }) => (
                    <LoginScreen
                        navigation={navigation}
                        onLoginSuccess={handleLoginSuccess}
                        onLoginFailure={handleLoginFailure}
                    />
                )}
            />
        </Stack.Navigator>
    );
}
