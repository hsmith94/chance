import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type LoadingSpinnerProps = {
    isLoading: boolean;
};

export default function LoadingSpinner({ isLoading }: LoadingSpinnerProps) {
    const [isShowingSpinner, setIsShowingSpinner] = useState<boolean>(false);

    let _timeout;

    const showSpinner = () => {
        _timeout = setTimeout(() => {
            setIsShowingSpinner(true);
        }, 300);
    };

    const hideSpinner = () => {
        if (_timeout) {
            clearTimeout(_timeout);
        }
        setIsShowingSpinner(false);
    };

    useEffect(() => {
        if (isLoading) {
            showSpinner();
        } else {
            hideSpinner();
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ? (
                <View style={{ ...styles.backdrop, ...(!isShowingSpinner ? styles.hide : {}) }}>
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
        transition: 'opacity 0.3s ease-in-out',
    },
    hide: {
        opacity: 0,
        pointerEvents: 'none',
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
