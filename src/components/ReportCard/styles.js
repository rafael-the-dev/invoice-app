import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    card: {
        '&:hover': {
            border: '1px solid #7C5DFA',
            cursor: 'pointer'
        }
    },
    cardContent: {
        paddingTop: '1.3rem'
    },
    cardSubContent: {
        marginTop: '1rem'
    },
    cardPrice: {},
    lightGareyText: {
        color: '#858BB2',
        '.dark-theme &': {
            color: '#DFE3FA !important'
        }
    },
    button: {
        //opacity: .8
    },
    cardPaidButton: {
        backgroundColor: '#33d69f1a',
        color: '#33D69F',
    },
    cardPendingButton: {
        backgroundColor: '#ff8f0021',
        color: '#FF8F00',
    },
    cardDraftButton: {
        backgroundColor: '#dfe3fa87',
        color: '#373B53',
        '.dark-theme &': {
            backgroundColor: '#dfe1ef30',
            color: '#DFE3FA !important'
        }
    }
}));