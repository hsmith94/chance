import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function LoadingSpinner({ isLoading }) {
    return (
        <>
            {isLoading ? (
                <View style={styles.backdrop}>
                    <ActivityIndicator size={120} style={styles.spinner} />
                </View>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        backdropFilter: 'brightness(0.2) blur(20px)',
        opacity: 0.33,
        zIndex: 998,
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});
