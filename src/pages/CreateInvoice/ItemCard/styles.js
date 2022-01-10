import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    textPurple: {
        color: '#7E88C3 !important',
        '.dark-theme &': {
            color: '#888EB0 !important'
        }
    },
    defaultInput: {
        border: '1px solid #DFE3FA',
        borderRadius: 4,
        fontWeight: 600,
        height: 40,
        marginTop: 10,
        padding: '4px 1rem',
        '.dark-theme &': {
            border: 'none !important'
        }
    },
    defaultInputPrice: {
        '.dark-theme &': {
            backgroundColor: 'transparent !important'
        }
    },
    marginRight: {
        marginRight: '8%'
    }
}));