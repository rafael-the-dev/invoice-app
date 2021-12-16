import { createContext, useCallback, useState } from 'react';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ openCreateInvoice, setOpenCreateInvoice ] = useState(false);

    const closeCreateInvoice = useCallback(() => setOpenCreateInvoice(false), []);
    const displayCreateInvoice = useCallback(() => setOpenCreateInvoice(true), []);

    return (
        <AppContext.Provider value={{ closeCreateInvoice, displayCreateInvoice, openCreateInvoice }}>{ children }</AppContext.Provider>
    );
}