import _ from 'lodash';
import React, { createContext, useContext, useState } from 'react';

type SetFn<T> = React.Dispatch<React.SetStateAction<T>>;

const LoadingContext = createContext<[boolean, SetFn<boolean>]>([false, _.noop]);

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    // prettier-ignore
    return (
        <LoadingContext.Provider value={[isLoading, setIsLoading]}>
            {children}
        </LoadingContext.Provider>
    );
};
