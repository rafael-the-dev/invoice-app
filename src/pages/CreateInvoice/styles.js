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
    textPurple: {
        color: '#7E88C3 !important'
    },
    defaultInput: {
        border: '1px solid #DFE3FA',
        borderRadius: 4,
        fontWeight: 600,
        height: 40,
        marginTop: 10,
        padding: '4px 1rem',
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
    }
}));