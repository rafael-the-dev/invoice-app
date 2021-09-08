import { makeStyles } from "@material-ui/core";

export const useResponsive = makeStyles(theme => ({
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