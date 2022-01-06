import { Button, Card, CardContent, Hidden, Paper, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { useBackground, useDisplay, useTypography, useResponsive } from '../../styles';
import classNames from 'classnames';
import { useContext, useRef } from 'react';
import { ThemeContext } from '../../context/ThemeContext'
import { AppContext } from '../../context/AppContext'
import { useTheme } from '../../theme/styles'

const ReportCard = ({ report }) => {
    const classes = useStyles();
    const display = useDisplay();
    const text = useTypography();
    const responsive = useResponsive();
    const bg = useBackground();
    const status = report.status.toLowerCase();

    const { displayCreateInvoice } = useContext(AppContext);
    const { theme } = useContext(ThemeContext);
    const themeStyles = useTheme(theme);

    const buttons = useRef({
        paid: classes.cardPaidButton,
        pending: classes.cardPendingButton,
        draft: classes.cardDraftButton
    });

    const getDate = () => {
        const date = new Date(report.paymentDue);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    return (
        <Card className={classNames(theme.componentBg, classes.card)} onClick={displayCreateInvoice(false)}>
            <CardContent className={classNames(classes.cardContent, responsive.smRow)}>
                <Hidden smUp>
                    <Paper
                        elevation={0} 
                        className={classNames(display.flex, display.alignCenter, display.justifyBetween, bg.transparent)}>
                        <Typography component="h2" variant="body2" className={classNames(text.font7)}>
                            <span className={classNames(classes.lightGareyText)}>#</span>{ report.id }
                        </Typography>
                        <Hidden smUp>
                            <Typography component="p" variant="body2" className={classNames(classes.lightGareyText)}>{ report.clientName }</Typography>
                        </Hidden>
                    </Paper>
                    <Paper elevation={0} className={classNames(display.flex, display.justifyBetween, bg.transparent, classes.cardSubContent)}>
                        <Paper 
                            elevation={0} 
                            className={classNames(display.flex, display.flexColumn, responsive.smRow, bg.transparent, responsive.smAlignCenter)}>
                            <Typography  component="p" variant="body2" className={classNames(classes.lightGareyText)}>
                                { getDate() }
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
                    <Paper elevation={0} className={classNames(display.flex, display.alignCenter, bg.transparent, display.justifyBetween,
                        display.w100)}>
                        <Typography component="h2" variant="body2" className={classNames(text.font7)}>
                            <span className={classNames(classes.lightGareyText)}>#</span>
                            <span className={classNames(themeStyles.darkWhiteText)}>{ report.id }</span>
                        </Typography>
                        <Typography  component="p" variant="body2" className={classNames(classes.lightGareyText)}>
                            Due { getDate() }
                        </Typography>
                        <Typography component="p" variant="body2" className={classNames(classes.lightGareyText)}>
                            { report.clientName }
                        </Typography>
                        <Typography  component="p" variant="h6" className={classNames(text.font7, classes.cardPrice, themeStyles.darkWhiteText)}>
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