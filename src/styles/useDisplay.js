import { makeStyles } from "@material-ui/core";

export const useDisplay = makeStyles(theme => ({
    alignCenter: {
        alignItems: 'center'
    },
    block: {
        display: 'block'
    },
    flex: {
        display: 'flex'
    },
    flexColumn: {
        flexDirection: 'column'
    },
    h100: {
        height: '100%'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    w100: {
        width: '100%'
    }
}));