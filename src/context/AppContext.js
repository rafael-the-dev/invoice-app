import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import data from '../data.json';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ openCreateInvoice, setOpenCreateInvoice ] = useState(false);
    const [ isCreateNewInvoiceDialog, setIsCreateNewInvoiceDialog ] = useState(false);
    const [ invoicesList, setInvoiceList ] = useState([]);
    const localStoraInvoicesName = useRef('invoice-app__invoices');
    const selectedInvoice = useRef({});

    const closeCreateInvoice = useCallback(() => setOpenCreateInvoice(false), []);
    const displayCreateInvoice = useCallback((state, report) => () => {
        setIsCreateNewInvoiceDialog(state);
        selectedInvoice.current = report;
        setOpenCreateInvoice(true);
    }, []);

    const getSelectedInvoice = useCallback(() => selectedInvoice.current, []);
    const setSelectedInvoice = useCallback((newInvoice) => selectedInvoice.current = newInvoice, []);

    useEffect(() => {
        if(!Boolean(localStorage.getItem(localStoraInvoicesName.current))) {
            //localStorage.setItem(localStoraInvoicesName.current, JSON.stringify([...data]));
            setInvoiceList([ ...data, ])
        } else {
            const list = [ ...JSON.parse(localStorage.getItem(localStoraInvoicesName.current))];
            setInvoiceList(list)
            //localStorage.setItem(localStoraInvoicesName.current, JSON.stringify(list));
        }
    }, []);

    useEffect(() => {
        if(invoicesList.length > 0)
        localStorage.setItem(localStoraInvoicesName.current, JSON.stringify(invoicesList));
    }, [ invoicesList ])

    return (
        <AppContext.Provider value={{ closeCreateInvoice, displayCreateInvoice, getSelectedInvoice, invoicesList, setInvoiceList, 
            isCreateNewInvoiceDialog, localStoraInvoicesName, openCreateInvoice, setSelectedInvoice }}>{ children }</AppContext.Provider>
    );
}