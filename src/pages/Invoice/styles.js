import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    main: {
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
    }
}));