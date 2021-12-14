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
                <Paper className={classNames(display.pl1, display.pr1, display.pt1, display.pb2)}>
                    <div className={classNames(display.flex, display.justifyBetween, display.flexColumn)}>
                        <Typography className={classNames(display.mb2)}>
                            <span className={classNames(classes.textLightPurple)}>#</span>
                            <spna className={classNames(text.font7)}>XM9141</spna><br />
                            <span className={classNames(classes.textLightPurple)}>Graphic Design</span>
                        </Typography>
                        <Typography className={classNames(classes.textLightPurple)}>
                            19 Union Terrace Lon<br/>E1 3EZ<br/>United Kingdom
                        </Typography>
                    </div>
                    <div className={classNames(display.flex, display.flexColumn, display.mt3)}>
                        <div className={classNames(display.flex, display.mt3)}>
                            <div>
                                <Typography gutterBottom className={classNames(classes.textLightPurple)}>Invoice Date</Typography>
                                <Typography className={classNames(display.mb1, text.font7)}>21 Aug 2021</Typography>
                                <Typography gutterBottom className={classNames(classes.textLightPurple)}>Payment Due</Typography>
                                <Typography className={classNames(display.mb1, text.font7)}>20 Sep 2021</Typography>
                            </div>
                            <div className={classNames(display.ml2)}>
                                <Typography gutterBottom className={classNames(classes.textLightPurple)}>Bill To</Typography>
                                <Typography gutterBottom className={classNames(text.font7)}>Alex Grim</Typography>
                                <Typography className={classNames(display.mb1, classes.textLightPurple)}>
                                    84 Church Way<br/>Bradford<br/>BD1 9PB<br/>United Kingdom
                                </Typography>
                            </div>
                        </div>
                        <div className={classNames(display.ml)}>
                            <Typography gutterBottom className={classNames(classes.textLightPurple)}>Sent to</Typography>
                            <Typography gutterBottom className={classNames(text.font7)}>alexgrim@mail.com</Typography>
                        </div>
                    </div>
                </Paper>
            </main>
        </div>
    );
};

export default Invoice;