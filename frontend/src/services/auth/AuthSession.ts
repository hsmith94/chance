module AuthSession {
    export const setToken = (token: string) => {
        if (!token) {
            throw Error('Token is undefined');
        }
        localStorage.setItem('token', token);
    };

    export const getToken = () => {
        return localStorage.getItem('token');
    };

    export const removeToken = () => {
        localStorage.removeItem('token');
    };
}

export default AuthSession;
