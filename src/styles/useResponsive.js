import { makeStyles } from "@material-ui/core";

export const useResponsive = makeStyles(theme => ({
    smAlignCenter: {
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center !important'
        }
    },
    smRow: {
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row !important'
        }
    },
    mdAlignStart: {
        [theme.breakpoints.up('md')]: {
            alignItems: 'flex-start !important'
        }
    },
    mdColumn: {
        [theme.breakpoints.up('md')]: {
            flexDirection: 'column !important'
        }
    }
}))