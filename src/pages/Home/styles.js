import { makeStyles } from "@material-ui/core";
import Iconplus from '../../assets/images/icon-plus.svg'

export const useClasses = makeStyles(theme => ({
    baseContainer: {
        [theme.breakpoints.up('md')]: {
            height: '100vh'
        }
    },
    main: {
        padding: '1.2rem 5% 4rem 5%',
        [theme.breakpoints.up('md')]: {
            paddingBottom: 0,
            paddingTop: '5rem'
        }
    },
    startIcon: {
        backgroundImage: `url(${Iconplus})`,
        backgroundSize: 15,
        backgroundColor: '#fff',
        borderRadius: '50%',
        display: 'inline-block',
        height: 30,
        marginRight: 10,
        width: 30
    },
    popoverContainer: {
        marginRight: '12%',
        [theme.breakpoints.up('md')]: {
            marginRight: '5%',
        }
    },
    checkboxGroup: {
        padding: '10px 8px 10px 15px'
    },
    newInvoiceButton: {
        height: 43,
        padding: '.3rem .9rem .3rem .5rem !important'
    }
}));