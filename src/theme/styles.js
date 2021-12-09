import { makeStyles } from "@material-ui/core";
import { colors } from '../styles/colors'

const { dark1, dark2, darkBlue, grey, light, lightBg } = colors;

export const useTheme = makeStyles(theme => ({
    componentBg: {
        backgroundColor: props => `${props.isLightTheme ? light : darkBlue } !important`,
    },
    darkWhiteText: {
        color: props => `${props.isLightTheme ? dark2 : light } !important`,
    },
    mainBg: {
        backgroundColor: props => `${props.isLightTheme ? lightBg : dark1 } !important`,
    }
}));