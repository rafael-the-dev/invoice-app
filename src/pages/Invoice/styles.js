import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    main: {
        backgroundColor: '#F2F2F2',
        padding: '1.2rem 5% 4rem 5%',
        [theme.breakpoints.up('md')]: {
            //overflow: 'auto',
           // padding: '5rem 15% 0 15%'
        }
    },
    textLightPurple: {
        color: '#858BB2'
    },
    status: {
        borderRadius: 5,
        padding: '0.45rem 0.9rem'
    },
    peddingStatus: {
        backgroundColor: '#ff8f0021',
        color: '#FF8F00',
    },
    checkout: {
        backgroundColor: '#F9FAFE',
        borderRadius: 7
    },
    checkoutTotalBanner: {
        backgroundColor: '#373B53',
        borderRadius: '0 0 8px 8px'
    }
}));