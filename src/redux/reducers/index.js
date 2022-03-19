import { addAllInvoices } from '../actions';
import { initialState } from '../state'

export const reducer = (state=initialState, action) => {
    switch(action.type) {
        case addAllInvoices().type: {
            return { ...state, invoices: action.payload }
        }
        default: {
            return state;
        }
    }
}