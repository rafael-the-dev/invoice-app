import { makeStyles } from "@material-ui/core";

export const useBackground = makeStyles(theme => ({
    center: {
        backgroundPosition: 'center'
    },
    contain: {
        backgroundSize: 'contain'
    },
    noRepeat: {
        backgroundRepeat: 'no-repeat'
    },
    transparent: {
        backgroundColor: 'transparent'
    }
}));