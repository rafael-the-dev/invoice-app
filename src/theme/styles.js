import { makeStyles } from "@material-ui/core";
import { colors } from '../styles/colors'

const { dark1, dark2, darkBlue, grey, light } = colors;

export const useTheme = makeStyles(theme => ({
    componentBg: {
        backgroundColor: props => `${props.isLight ? light : darkBlue } !important`,
    },
    darkWhiteText: {
        color: props => `${props.isLight ? dark2 : light } !important`,
    },
    mainBg: {
        backgroundColor: props => `${props.isLight ? grey : dark1 } !important`,
    }
}));