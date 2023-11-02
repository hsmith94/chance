import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from '../../random';
import HomeScreen from './HomeScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <HomeStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Details' }}
                initialParams={{ itemId: 0 }}
            />
        </HomeStack.Navigator>
    );
}
