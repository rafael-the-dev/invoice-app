export const addInvoice = payload => ({
    payload,
    type: 'ADD_INVOICE'
});


export const addAllInvoices = payload => ({
    payload,
    type: 'ADD_ALL_INVOICES'
});


export const deleteInvoice = payload => ({
    payload,
    type: 'DELETE_INVOICE'
});

export const markInvoiceAsPaid = payload => ({
    payload,
    type: 'MARK_INVOICE_AS_PAID'
});

export const changeTheme = payload => ({
    payload,
    type: 'CHANGE_THEME'
});

export const toggleStateTheme = () => ({
    type: 'TOGGLE_THEME'
});

