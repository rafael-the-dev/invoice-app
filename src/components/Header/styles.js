import { makeStyles } from "@material-ui/core";
import sunIcon from '../../assets/images/icon-sun.svg'
import moonIcon from '../../assets/images/icon-moon.svg'

export const useClasses = makeStyles(theme => ({
    header: {
        backgroundColor: '#373B53',
        paddingRight: '5%'
    },
    headerLogoContainer: {
        backgroundColor: '#7C5DFA',
        borderRadius: '0 20px 20px 0',
        height: 70,
        position: 'relative',
        width: '80px !important'
    },
    headerLogo: {
        height: 30,
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        width: 30
    },
    headerShape: {
        backgroundColor: '#9277FF',
        borderRadius: '20px 0 20px 0',
        height: 35
    },
    headerToggleContainer: {
        flexGrow: 1
    },
    headerToggleButton: {
        backgroundImage: `url(${sunIcon})`,
        height: 25,
        width: 20
    },
    headerToggleButtonMoonIcon: {
        backgroundImage: `url(${moonIcon})`
    }
}));
