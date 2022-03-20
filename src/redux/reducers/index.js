import { addAllInvoices, addInvoice, changeTheme, deleteInvoice, markInvoiceAsPaid, toggleStateTheme } from '../actions';
import { initialState } from '../state';

const addNewInvoice = (state, payload) => {
    return { ...state, invoices: [ ...state.invoices, payload.invoice ]};
};

const changeThemeFunc = (state, payload) => {
    return { ...state, theme: payload}
};

const deleteInvoiceFunc = (state, payload) => {
    const invoices = [ ...state.invoices.filter(item => item.id !== payload.id) ];
    return { ...state, invoices };
}

const markInvoiceAsPaidFunc = (state, payload) => {
    const invoices = [ ...state.invoices ];
    const result = invoices.find(item => item.id === payload.id);

    if(result) {
        result['status'] = 'paid';
    }

    return { ...state, invoices };
}

const toggleThemeFunc = (state) => {
    return { ...state, theme: { isLightTheme: !state.theme.isLightTheme } };
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case addInvoice().type: {
            return addNewInvoice(state, action.payload);
        }
        case addAllInvoices().type: {
            return { ...state, invoices: action.payload }
        }
        case changeTheme().type: {
            return changeThemeFunc(state, action.payload);
        }
        case deleteInvoice().type: {
            return deleteInvoiceFunc(state, action.payload);
        }
        case markInvoiceAsPaid().type: {
            return markInvoiceAsPaidFunc(state, action.payload);
        }
        case toggleStateTheme().type: {
            return toggleThemeFunc(state);
        }
        default: {
            return state;
        }
    }
}