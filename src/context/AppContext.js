import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import data from '../data.json';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ openCreateInvoice, setOpenCreateInvoice ] = useState(false);
    const [ isCreateNewInvoiceDialog, setIsCreateNewInvoiceDialog ] = useState(false);
    const [ invoicesList, setInvoiceList ] = useState([]);
    const localStoraInvoicesName = useRef('invoice-app__invoices')

    const closeCreateInvoice = useCallback(() => setOpenCreateInvoice(false), []);
    const displayCreateInvoice = useCallback((state) => () => {
        setIsCreateNewInvoiceDialog(state);
        setOpenCreateInvoice(true);
    }, []);

    useEffect(() => {
        if(!Boolean(localStorage.getItem(localStoraInvoicesName.current))) {
            localStorage.setItem(localStoraInvoicesName.current, JSON.stringify([]));
            setInvoiceList([ ...data, ])
        } else {
            setInvoiceList([ ...data, ...JSON.parse(localStorage.getItem(localStoraInvoicesName.current))])
        }
    }, [])

    return (
        <AppContext.Provider value={{ closeCreateInvoice, displayCreateInvoice, invoicesList, setInvoiceList, 
            isCreateNewInvoiceDialog, localStoraInvoicesName, openCreateInvoice }}>{ children }</AppContext.Provider>
    );
}