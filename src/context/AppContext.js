import { createContext, useCallback, useState } from 'react';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ openCreateInvoice, setOpenCreateInvoice ] = useState(false);
    const [ isCreateNewInvoiceDialog, setIsCreateNewInvoiceDialog ] = useState(false);

    const closeCreateInvoice = useCallback(() => setOpenCreateInvoice(false), []);
    const displayCreateInvoice = useCallback((state) => () => {
        setIsCreateNewInvoiceDialog(state);
        setOpenCreateInvoice(true);
    }, []);

    return (
        <AppContext.Provider value={{ closeCreateInvoice, displayCreateInvoice, isCreateNewInvoiceDialog, openCreateInvoice }}>{ children }</AppContext.Provider>
    );
}