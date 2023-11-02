import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useLoadingContext } from '../../contexts/Loading/LoadingProvider';

export default function FriendsScreen({ navigation }) {
    const [isLoading, setIsLoading] = useLoadingContext();

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 2 * 1000);
        }
    });

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Friends Screen</Text>
        </View>
    );
}
