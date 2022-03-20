import { addAllInvoices, changeTheme, deleteInvoice, toggleStateTheme } from '../actions';
import { initialState } from '../state';

const changeThemeFunc = (state, payload) => {
    return { ...state, theme: payload}
};

const deleteInvoiceFunc = (state, payload) => {
    const invoices = [ ...state.invoices.filter(item => item.id !== payload.id) ];
    return { ...state, invoices };
}

const toggleThemeFunc = (state) => {
    return { ...state, theme: { isLightTheme: !state.theme.isLightTheme } };
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case addAllInvoices().type: {
            return { ...state, invoices: action.payload }
        }
        case changeTheme().type: {
            return changeThemeFunc(state, action.payload);
        }
        case deleteInvoice().type: {
            return deleteInvoiceFunc(state, action.payload);
        }
        case toggleStateTheme().type: {
            return toggleThemeFunc(state);
        }
        default: {
            return state;
        }
    }
}