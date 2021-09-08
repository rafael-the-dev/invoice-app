import { makeStyles } from "@material-ui/core";

export const useClasses = makeStyles(theme => ({
    defaultButton: {
        backgroundColor: '#7C5DFA',
        border: 'none',
        borderRadius: 15,
        color: '#fff',
        height: 45,
        outline: 'none',
        padding: '.3rem .9rem'
    }
}));