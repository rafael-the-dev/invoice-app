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
        color: '#858BB2'
    },
    button: {
        //opacity: .8
    },
    cardPaidButton: {
        //backgroundColor: '#33D69F',
        color: '#33D69F',
    },
    cardPendingButton: {
        //backgroundColor: '#FF8F00',
        color: '#FF8F00'
    },
    cardDraftButton: {
        //backgroundColor: '##DFE3FA',
        color: '#373B53'
    }
}));