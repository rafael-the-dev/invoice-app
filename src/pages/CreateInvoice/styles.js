import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    dialogRoot: {
        top: '72px !important',
        '& .MuiBackdrop-root': {
            top: '70px !important'
        },
        [theme.breakpoints.up('md')]: {
            left: '65px !important',
            top: '0 !important',
            '& .MuiBackdrop-root': {
                left: '65px !important',
                top: '0 !important'
            }
        }
    },
    dialogPaper: {
        margin: '0 !important',
        height: '100%',
        maxHeight: '100% !important',
        paddingBottom: 16,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '100% !important',
            width: 490
        },
        [theme.breakpoints.up(800)]: {
            width: 560
        },
        [theme.breakpoints.up('md')]: {
            width: 640
        }
    },
    px: {
        paddingLeft: '5% !important',
        paddingRight: '5% !important'
    },
    dialogTitle: {
        '& h2': {
            color: '#0C0E16 !important',
            fontWeight: 700,
            '.dark-theme &': {
                color: '#FFF !important'
            }
        }
    },
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
    cityContainer: {
        marginRight: '5%'
    },
    postCodeContainer: {
        marginLeft: '5%' 
    },
    countryContainer: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '5%' 
        }
    },
    invoiceDateContainer: {
        [theme.breakpoints.up('sm')]: {
            marginRight: '5%' 
        }
    },
    paymnetTerm: {
        border: '1px solid #DFE3FA',
        marginTop: 10,
        '.dark-theme &': {
            border: 'none !important'
        }
    },
    paymnetTermRoot: {
        '& fieldset': {
            borderColor: 'transparent !important'
        },
        '& .MuiSelect-selectMenu': {
            '.dark-theme &': {
                color: '#FFF !important'
            }
        }
    },
    gradientContainer: {
        backgroundImage: 'linear-gradient(to bottom, rgb(229 229 229 / 9%), rgb(191 191 191 / 40%))',
        height: 30,
        '.dark-theme &': {
            backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.1) 100%) !important'
        }
    },
    buttonPill: {
        borderRadius: '24px !important',
        padding: '.5rem .7rem !important'
    },
    editButton: {
        backgroundColor: '#F9FAFE !important',
        color: '#7E88C3 !important'
    },
    saveAsDraft: {
        backgroundColor: '#373B53 !important'
    },
    saveButton: {
        backgroundColor: '#7C5DFA !important',
    },
    error: {
        border: '1px solid red !important',
        color: 'red !important'
    },
    errorText: {
        color: 'red'
    }
}));