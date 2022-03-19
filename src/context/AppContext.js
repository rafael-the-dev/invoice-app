import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import data from '../data.json';
import { useDispatch, useSelector } from 'react-redux'
import { addAllInvoices } from '../redux/actions';
import { getAllInvoices } from '../redux/selectors';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const reduxInvoices = useSelector(getAllInvoices);

    const [ openCreateInvoice, setOpenCreateInvoice ] = useState(false);
    const [ isCreateNewInvoiceDialog, setIsCreateNewInvoiceDialog ] = useState(false);
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
    const [ invoicesList, setInvoiceList ] = useState([]);
    const localStoraInvoicesName = useRef('invoice-app__invoices');
    const selectedInvoice = useRef({});
    const invoiceToBeDeleted = useRef({});

    const closeCreateInvoice = useCallback(() => setOpenCreateInvoice(false), []);
    const displayCreateInvoice = useCallback((state, report) => () => {
        setIsCreateNewInvoiceDialog(state);
        selectedInvoice.current = report;
        setOpenCreateInvoice(true);
    }, []);

    const getSelectedInvoice = useCallback(() => selectedInvoice.current, []);
    const setSelectedInvoice = useCallback((newInvoice) => selectedInvoice.current = newInvoice, []);

    const getInvoiceToBeDeleted = useCallback(() => invoiceToBeDeleted.current, []);
    const setInvoiceToBeDeleted = useCallback((newInvoice) => invoiceToBeDeleted.current = newInvoice, []);

    const handleCloseDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);

    useEffect(() => {
        if(!Boolean(localStorage.getItem(localStoraInvoicesName.current))) {
            //localStorage.setItem(localStoraInvoicesName.current, JSON.stringify([...data]));
            setInvoiceList([ ...data, ]);
            dispatch(addAllInvoices([ ...data, ]));
        } else {
            const list = [ ...JSON.parse(localStorage.getItem(localStoraInvoicesName.current))];
            setInvoiceList(list);
            dispatch(addAllInvoices(list));
            //localStorage.setItem(localStoraInvoicesName.current, JSON.stringify(list));
        }
    }, [ dispatch ]);

    useEffect(() => {
        if(reduxInvoices.length > 0)
            localStorage.setItem(localStoraInvoicesName.current, JSON.stringify(reduxInvoices));
    }, [ reduxInvoices ])

    return (
        <AppContext.Provider value={{ closeCreateInvoice, displayCreateInvoice, getSelectedInvoice, 
            handleCloseDeleteDialog, getInvoiceToBeDeleted, invoicesList, setInvoiceList, 
            isCreateNewInvoiceDialog, localStoraInvoicesName, openCreateInvoice, openDeleteDialog, 
            setInvoiceToBeDeleted, setOpenDeleteDialog, setSelectedInvoice }}>{ children }</AppContext.Provider>
    );
}