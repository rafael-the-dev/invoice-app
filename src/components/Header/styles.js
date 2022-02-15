import { makeStyles } from "@material-ui/core";
import sunIcon from '../../assets/images/icon-sun.svg'
import moonIcon from '../../assets/images/icon-moon.svg'

export const useClasses = makeStyles(theme => ({
    header: {
        backgroundColor: '#373B53',
        paddingRight: '5%',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'column !important',
            paddingRight: 0,
            width: 'auto'
        }
    },
    
    headerLogoContainer: {
        backgroundColor: '#7C5DFA !important',
        borderRadius: '0 20px 20px 0',
        height: 70,
        position: 'relative',
        width: '80px',
        [theme.breakpoints.up('md')]: {
            width: '100%'
        }
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
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            paddingBottom: '1rem'
        }
    },
    headerToggleButton: {
        backgroundImage: `url(${sunIcon})`,
        height: 25,
        width: 20,
        [theme.breakpoints.up('md')]: {
            marginBottom: '30%'
        }
    },
    headerToggleButtonMoonIcon: {
        backgroundImage: `url(${moonIcon})`
    }
}));
