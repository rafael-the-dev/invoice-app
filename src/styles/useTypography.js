import { makeStyles } from "@material-ui/core";

export const useTypography = makeStyles(theme => ({
    alignCenter: {
        textAlign: 'center !important'
    },
    alignLeft: {
        textAlign: 'left !important'
    },
    alignRight: {
        textAlign: 'right !important'
    },
    decorationNone: {
        textDecoration: 'none !important'
    },
    font7: {
        fontWeight: '700 !important'
    },
    noUnderline: {
        textDecoration: 'none'
    },
    textDark: {
        color: '#000 !important'
    },
    textLight: {
        color: '#FFF !important'
    },
    rem7: {
        fontSize: '.7rem !important'
    },
    rem8: {
        fontSize: '.8rem !important'
    },
    rem9: {
        fontSize: '.9rem !important'
    },
    smAlignRight: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'right !important'
        }
    },
    mdAlignEnd: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'right !important'
        }
    }
}))