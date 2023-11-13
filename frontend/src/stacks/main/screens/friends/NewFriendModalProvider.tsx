import _ from 'lodash';
import React, { createContext, useContext, useState } from 'react';
import { Modal, Provider as PaperProvider, Portal } from 'react-native-paper';
import NewFriendModalContent from './NewFriendModalContent';

type NewFriendModalContextType = {
    showNewFriendModal: () => void;
    hideNewFriendModal: () => void;
};

const NewFriendModalContext = createContext<NewFriendModalContextType>({
    showNewFriendModal: _.noop,
    hideNewFriendModal: _.noop,
});

export const useNewFriendModalContext = () => useContext(NewFriendModalContext);

export const NewFriendModalProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const showNewFriendModal = () => setIsVisible(true);
    const hideNewFriendModal = () => setIsVisible(false);

    return (
        <NewFriendModalContext.Provider value={{ showNewFriendModal, hideNewFriendModal }}>
            <PaperProvider>
                <Portal>
                    <Modal visible={isVisible} onDismiss={hideNewFriendModal} contentContainerStyle={{ padding: 20 }}>
                        <NewFriendModalContent />
                    </Modal>
                </Portal>
                {children}
            </PaperProvider>
        </NewFriendModalContext.Provider>
    );
};
