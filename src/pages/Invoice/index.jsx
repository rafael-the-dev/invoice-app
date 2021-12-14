import { useStyles } from './styles'
import { Button, FormControlLabel, FormGroup, Checkbox, Grid, Hidden, Paper, Popover, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../styles';
import Header from '../../components/Header';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const Invoice = () => {
    const display = useDisplay();
    const classes = useStyles();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

    return (
        <div className={classNames(classes.baseContainer, display.flex, display.flexColumn, responsive.mdRow)}>
            <Header />
            <main
                className={classNames(classes.main, responsive.mdAlignStart)}>
                <div className={classNames(display.pb2)} >
                    <Button startIcon={<ArrowBackIosIcon />}>Go back</Button>
                </div>
                <Paper className={classNames(display.mb2, display.pl1, display.pr1, display.pb1, display.pt1)}>
                    <div className={classNames(display.flex, display.justifyBetween, display.alignCenter, 
                        responsive.mdAlignStart)}>
                        <Typography className={classNames(classes.textLightPurple)}>Status</Typography>
                        <Typography className={classNames(text.font7, classes.peddingStatus, classes.status)}>Pending</Typography>
                    </div>
                </Paper>

            </main>
        </div>
    );
};

export default Invoice;