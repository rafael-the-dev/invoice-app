import { useStyles } from './styles'
import { Button, Hidden, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useDisplay, useResponsive, useTypography } from '../../styles';
import Header from '../../components/Header';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

const Invoice = () => {
    const display = useDisplay();
    const classes = useStyles();
    //const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

    const history = useHistory();

    const buttonsMemo = useMemo(() => (
        <>
            <Button className={classNames(classes.buttonPill, text.rem8, text.font7, classes.editButton)}>Edit</Button>
            <Button className={classNames(classes.buttonPill, text.rem8, responsive.smMl1, text.font7, text.textLight, classes.deleteButton)}>Delete</Button>
            <Button className={classNames(classes.buttonPill, text.rem8, responsive.smMl1, text.font7, text.textLight, classes.saveButton)}>Mark as paid</Button>
        </>
    ), [ classes, text, responsive ]);

    const BillToContainer = ({ hide }) => (
        <div className={classNames(display.ml2, responsive.smMl0, 
            {[display.none]: hide, [responsive.smInlineBlock]: hide, [responsive.smNone]: !hide})}>
            <Typography gutterBottom className={classNames(classes.textLightPurple)}>Bill To</Typography>
            <Typography gutterBottom className={classNames(text.font7)}>Alex Grim</Typography>
            <Typography className={classNames(display.mb1, classes.textLightPurple)}>
                84 Church Way<br/>Bradford<br/>BD1 9PB<br/>United Kingdom
            </Typography>
        </div>
    );

    return (
        <div className={classNames(classes.baseContainer, display.flex, display.flexColumn, responsive.mdRow)}>
            <Header />
            <main
                className={classNames(classes.main, responsive.mdAlignStart, display.flexGrow1)}>
                <div className={classNames(display.pb2)} >
                    <Button 
                        onClick={() => history.push('/')}
                        startIcon={<ArrowBackIosIcon className={classNames(classes.textLightPurple)} />}>
                        Go back
                    </Button>
                </div>
                <Paper className={classNames(display.mb2, display.pl1, display.pr1, display.pb1, display.pt1, display.flex, 
                    display.alignCenter, display.justifyBetween)}>
                    <div className={classNames(display.flex, display.justifyBetween, display.alignCenter, 
                        responsive.mdAlignStart, classes.statusContainer)}>
                        <Typography className={classNames(classes.textLightPurple)}>Status</Typography>
                        <Typography className={classNames(text.font7, classes.peddingStatus, classes.status)}>Pending</Typography>
                    </div>
                    <div  className={classNames(display.none, display.alignCenter, display.justifyBetween,
                        responsive.smFlex)}>
                        { buttonsMemo }
                    </div>
                </Paper>
                <Paper className={classNames(display.pl1, display.pr1, display.pt1, display.pb2)}>
                    <div className={classNames(display.flex, display.justifyBetween, display.flexColumn, responsive.smRow)}>
                        <Typography className={classNames(display.mb2, responsive.smMb0)}>
                            <span className={classNames(classes.textLightPurple)}>#</span>
                            <spna className={classNames(text.font7)}>XM9141</spna><br />
                            <span className={classNames(classes.textLightPurple)}>Graphic Design</span>
                        </Typography>
                        <Typography className={classNames(classes.textLightPurple)}>
                            19 Union Terrace Lon<br/>E1 3EZ<br/>United Kingdom
                        </Typography>
                    </div>
                    <div className={classNames(display.flex, display.flexColumn, display.mt3, responsive.smMt2,
                        responsive.smRow, display.justifyBetween)}>
                        <div className={classNames(display.flex, display.mt3, responsive.smMt0,
                            responsive.smJustifyBetween)}>
                            <div>
                                <Typography gutterBottom className={classNames(classes.textLightPurple)}>Invoice Date</Typography>
                                <Typography className={classNames(display.mb1, text.font7)}>21 Aug 2021</Typography>
                                <Typography gutterBottom className={classNames(classes.textLightPurple)}>Payment Due</Typography>
                                <Typography className={classNames(display.mb1, text.font7)}>20 Sep 2021</Typography>
                            </div>
                            <BillToContainer hide={false} />
                        </div>
                        <BillToContainer hide={true} />
                        <div className={classNames()}>
                            <Typography gutterBottom className={classNames(classes.textLightPurple)}>Sent to</Typography>
                            <Typography gutterBottom className={classNames(text.font7)}>alexgrim@mail.com</Typography>
                        </div>
                    </div>
                    <div className={classNames(display.mt3, classes.checkout, display.pt1, display.pb1, display.pl1,
                        display.pr1)}>
                        <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                            display.mb1)}>
                            <Typography className={classNames()}>
                                <spna className={classNames(text.font7)}>Banner Design</spna><br />
                                <span className={classNames(classes.textLightPurple)}>1 x £ 156.00</span>
                            </Typography>
                            <Typography className={classNames(text.font7)}>£ 156.00</Typography>
                        </div>
                        <div className={classNames(display.flex, display.alignCenter, display.justifyBetween)}>
                            <Typography className={classNames()}>
                                <spna className={classNames(text.font7)}>Email Design</spna><br />
                                <span className={classNames(classes.textLightPurple)}>2 x £ 200.00</span>
                            </Typography>
                            <Typography className={classNames(text.font7)}>£ 400.00</Typography>
                        </div>
                    </div>
                    <div className={classNames(display.flex, display.alignCenter, display.justifyBetween, display.pl1,
                        display.pr1, display.pb2, display.pt2, classes.checkoutTotalBanner)}>
                        <Typography className={classNames(text.textLight, display.opacity7)}>Grand Total</Typography>
                        <Typography variant="h6" className={classNames(text.font7, text.textLight)}>£ 556.00</Typography>
                    </div>
                </Paper>
            </main>
            <Hidden smUp>
                <Paper component="footer" elevation={0} className={classNames(display.flex, display.alignCenter, display.pt1,
                    display.pb1, display.justifyBetween, display.pl1, display.pr1)}> 
                    { buttonsMemo }
                </Paper>
            </Hidden>
        </div>
    );
};

export default Invoice;