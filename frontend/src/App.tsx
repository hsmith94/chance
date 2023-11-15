import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { LOCAL_URL, PUBLIC_URL } from './config/constants';
import { ENV } from './config/environment';
import { LoadingProvider, useLoadingContext } from './contexts/Loading/LoadingProvider';
import { SCREENS_MAPPING } from './screens-mapping';
import AuthSession from './services/auth/AuthSession';
import LoginStackScreen from './stacks/login/LoginStackScreen';
import { MainStackScreen } from './stacks/main/MainStackScreen';

export default function App() {
    const { isLoading } = useLoadingContext();
    const [isSignedIn, setIsSignedIn] = useState(false);

    async function validateAuthSession() {
        const hasToken = await AuthSession.hasToken(); // NOTE: This just asserts the token exists, it doesn't validate it
        if (hasToken) {
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    }

    useEffect(() => {
        validateAuthSession();
    }, []);

    const linking: LinkingOptions<typeof SCREENS_MAPPING> = {
        prefixes: ENV === 'development' ? [LOCAL_URL] : [PUBLIC_URL],
        config: {
            screens: SCREENS_MAPPING,
        },
    };

    return (
        <LoadingProvider>
            <NavigationContainer linking={linking}>
                {isSignedIn ? (
                    <MainStackScreen onSignOut={() => setIsSignedIn(false)} />
                ) : (
                    <LoginStackScreen onSignIn={() => setIsSignedIn(true)} />
                )}
            </NavigationContainer>
            <LoadingSpinner isLoading={isLoading} />
        </LoadingProvider>
    );
}
