import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    baseContainer: {
        boxSizing: 'border-box',
        [theme.breakpoints.up('md')]: {
            height: '100vh'
        }
    },
    main: {
        backgroundColor: '#F2F2F2',
        padding: '1.2rem 5% 4rem 5%',
        [theme.breakpoints.up('md')]: {
            maxHeight: '100vh',
            overflow: 'auto',
            padding: '5rem 15% 2rem 15%'
        }
    },
    textLightPurple: {
        color: '#858BB2',
        '.dark-theme &': {
            color: '#DFE3FA !important'
        }
    },
    statusContainer: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto'
        }
    },
    status: {
        borderRadius: 5,
        padding: '0.45rem 0.9rem',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '1rem'
        }
    },
    peddingStatus: {
        backgroundColor: '#ff8f0021',
        color: '#FF8F00',
    },
    paidStatus: {
        backgroundColor: '#33d69f1a',
        color: '#33D69F',
    },
    draftStatus: {
        backgroundColor: '#dfe3fa87',
        color: '#373B53'
    },
    checkout: {
        backgroundColor: '#F9FAFE',
        borderRadius: 7
    },
    checkoutTotalBanner: {
        backgroundColor: '#373B53',
        borderRadius: '0 0 8px 8px'
    },
    buttonPill: {
        borderRadius: '24px !important',
        padding: '.5rem .7rem !important'
    },
    editButton: {
        backgroundColor: '#F9FAFE !important',
        color: '#7E88C3 !important'
    },
    deleteButton: {
        backgroundColor: '#EC5757 !important'
    },
    saveButton: {
        backgroundColor: '#7C5DFA !important',
    }
}));