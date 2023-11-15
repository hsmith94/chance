import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'access_token';

module AuthSession {
    export const setToken = async (token: string) => {
        if (!token) {
            throw Error('Token is undefined');
        }
        await AsyncStorage.setItem(TOKEN_KEY, token);
    };

    export const getToken = async () => {
        return await AsyncStorage.getItem(TOKEN_KEY);
    };

    export const removeToken = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
    };

    export const hasToken = () => {
        return !!getToken();
    };
}

export default AuthSession;
