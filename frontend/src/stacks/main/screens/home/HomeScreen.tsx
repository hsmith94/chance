import _ from 'lodash';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, MD3Colors, Surface, Text } from 'react-native-paper';
import { BANNER_IMAGE_SRC } from '../../../../config/constants';
import { DEFAULT_PADDING } from '../../../../config/styles';

export default function HomeScreen({ navigation }) {
    return (
        <>
            <ScrollView stickyHeaderIndices={[0]}>
                <View style={styles.container}>
                    <Image style={styles.bannerImage} source={{ uri: BANNER_IMAGE_SRC }} />
                    <Text style={{ color: 'white', marginBottom: DEFAULT_PADDING }} variant="displayLarge">
                        Chance
                    </Text>
                    <Button onPress={() => navigation.navigate('Friends')} mode="contained">
                        Go to Friends
                    </Button>
                </View>
                <View style={{ padding: DEFAULT_PADDING }}>
                    {_.range(0, 5).map((index) => (
                        <Surface key={index} style={styles.emptySurface} elevation={1}>
                            <></>
                        </Surface>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: DEFAULT_PADDING,
        minHeight: 200,
    },
    // TODO: Center this image on Mobile
    bannerImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        // left: '50%',
        // right: '50%',
        // transform: [{ translateX: '-50%' as any }],
        zIndex: -1,
        opacity: 1,
        backgroundColor: MD3Colors.primary10,
    },
    emptySurface: {
        height: 200,
        width: '100%',
        backgroundColor: '#fafafa',
        borderRadius: 10,
        marginBottom: DEFAULT_PADDING,
    },
});
