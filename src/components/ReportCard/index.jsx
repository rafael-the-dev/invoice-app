import { Button, Card, CardContent, Hidden, Paper, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { useDisplay, useTypography, useResponsive } from '../../styles';
import classNames from 'classnames';
import { useRef } from 'react';

const ReportCard = ({ report }) => {
    const classes = useStyles();
    const display = useDisplay();
    const text = useTypography();
    const responsive = useResponsive();
    const status = report.status.toLowerCase();

    const buttons = useRef({
        paid: classes.cardPaidButton,
        pending: classes.cardPendingButton,
        draft: classes.cardDraftButton
    })

    return (
        <Card>
            <CardContent className={classNames(classes.cardContent, responsive.smRow)}>
                <Hidden smUp>
                    <Paper
                        elevation={0} 
                        className={classNames(display.flex, display.alignCenter, display.justifyBetween)}>
                        <Typography component="h2" variant="body2" className={classNames(text.font7)}>
                            <span className={classNames(classes.lightGareyText)}>#</span>{ report.id }
                        </Typography>
                        <Hidden smUp>
                            <Typography component="p" variant="body2" className={classNames(classes.lightGareyText)}>{ report.clientName }</Typography>
                        </Hidden>
                    </Paper>
                    <Paper elevation={0} className={classNames(display.flex, display.justifyBetween, classes.cardSubContent)}>
                        <Paper 
                            elevation={0} 
                            className={classNames(display.flex, display.flexColumn, responsive.smRow, responsive.smAlignCenter)}>
                            <Typography  component="p" variant="body2" className={classNames(classes.lightGareyText)}>
                                { report.paymentDue }
                            </Typography>
                            <Typography  component="p" variant="h6" className={classNames(text.font7, classes.cardPrice)}>
                                £{ report.total }
                            </Typography>
                        </Paper>
                        <Button className={classNames(buttons.current[report.status.toLowerCase()], classes.button)}>
                            { report.status }
                        </Button>
                    </Paper>
                </Hidden>
                <Hidden xsDown>
                    <Paper elevation={0} className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                        display.w100)}>
                        <Typography component="h2" variant="body2" className={classNames(text.font7)}>
                            <span className={classNames(classes.lightGareyText)}>#</span>{ report.id }
                        </Typography>
                        <Typography  component="p" variant="body2" className={classNames(classes.lightGareyText)}>
                            Due { report.paymentDue }
                        </Typography>
                        <Typography component="p" variant="body2" className={classNames(classes.lightGareyText)}>
                            { report.clientName }
                        </Typography>
                        <Typography  component="p" variant="h6" className={classNames(text.font7, classes.cardPrice)}>
                            £{ report.total }
                        </Typography>
                        <Button className={classNames(buttons.current[report.status.toLowerCase()], classes.button)}>
                            { report.status }
                        </Button>
                    </Paper>
                </Hidden>
            </CardContent>
        </Card>
    )
};

export default ReportCard;