export const addInvoice = payload => ({
    payload,
    type: 'ADD_INVOICE'
});


export const addAllInvoices = payload => ({
    payload,
    type: 'ADD_ALL_INVOICES'
});

export const changeTheme = payload => ({
    payload,
    type: 'CHANGE_THEME'
});

export const toggleStateTheme = () => ({
    type: 'TOGGLE_THEME'
});

