import { useStyles } from './styles'
import { Button, Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../styles';
import Header from '../../components/Header';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useContext, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext'
import { useState } from 'react';
import { useCallback } from 'react';
import CreateInvoice from '../CreateInvoice';
import { useRef } from 'react';
import { useSelector } from 'react-redux'
import { getAllInvoices } from '../../redux/selectors';
import { useDispatch } from 'react-redux'
import { markInvoiceAsPaid } from '../../redux/actions'

const Invoice = () => {
    const display = useDisplay();
    const classes = useStyles();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();
    
    const dispatch = useDispatch();

    const invoicesList = useSelector(getAllInvoices);

    const { displayCreateInvoice, openCreateInvoice, setOpenDeleteDialog, setInvoiceToBeDeleted } = useContext(AppContext);
    const [ invoice, setInvoice ] = useState({});
    const history = useHistory();
    const { id } = useParams();

    const statusRef = useRef({
        draft: classes.draftStatus,
        paid: classes.paidStatus,
        pending: classes.peddingStatus,
    });

    const markAsPaidClickHandler = useCallback(() => {
        dispatch(markInvoiceAsPaid({
            id
        }));
    }, [ dispatch, id ])

    const buttonsMemo = useMemo(() => (
        <>
            <Button 
                onClick={displayCreateInvoice(false, invoice)}
                className={classNames(classes.buttonPill, text.rem8, text.font7, classes.editButton)}>Edit</Button>
            <Button 
                onClick={() => setOpenDeleteDialog(true)}
                className={classNames(classes.buttonPill, text.rem8, responsive.smMl1, text.font7, text.textLight, classes.deleteButton)}>Delete</Button>
            <Button 
                onClick={markAsPaidClickHandler}
                className={classNames(classes.buttonPill, text.rem8, responsive.smMl1, text.font7, text.textLight, classes.saveButton)}>Mark as paid</Button>
        </>
    ), [ classes, displayCreateInvoice, invoice, markAsPaidClickHandler, responsive, setOpenDeleteDialog, text ]);

    const BillToContainer = ({ hide }) => (
        <div className={classNames(display.ml2, responsive.smMl0, 
            {[display.none]: hide, [responsive.smInlineBlock]: hide, [responsive.smNone]: !hide})}>
            <Typography gutterBottom className={classNames(classes.textLightPurple)}>Bill To</Typography>
            <Typography gutterBottom className={classNames(text.font7, 'theme-text')}>{ invoice.clientName }</Typography>
            <Typography className={classNames(display.mb1, classes.textLightPurple)}>
                { invoice.clientAddress?.street}<br/>
                { invoice.clientAddress?.city}<br/>
                { invoice.clientAddress?.postCode}<br/>
                { invoice.clientAddress?.country}
            </Typography>
        </div>
    );

    const getDate = (dateAsString) => {
        if(dateAsString === null) 
            return "not set";
        const date = new Date(dateAsString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    };

    const getItemsAsTable = useCallback(() => (
        <Hidden smDown>
            <TableContainer component={Paper} elevation={0} className={classNames(bg.transparent)}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classNames(classes.textLightPurple, display.borderNone)}>Item Name</TableCell>
                                <TableCell align="right" className={classNames(classes.textLightPurple, display.borderNone)}>QTY</TableCell>
                                <TableCell align="right" className={classNames(classes.textLightPurple, display.borderNone)}>Price</TableCell>
                                <TableCell align="right" className={classNames(classes.textLightPurple, display.borderNone)}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoice.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" className={classNames(text.font7, display.borderNone, 'theme-text')}>{ item.name }</TableCell>
                                    <TableCell align="right" className={classNames(classes.textLightPurple, text.font7, display.borderNone)}>{item.quantity}</TableCell>
                                    <TableCell align="right" className={classNames(classes.textLightPurple, text.font7, display.borderNone)}>£ {item.price}</TableCell>
                                    <TableCell align="right" className={classNames(text.font7, display.borderNone, 'theme-text')}>£ {item.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
        </Hidden>
    ), [ bg, classes, display, invoice, text ]);

    const getItems = useCallback(() => {
        return invoice.items ? <>
        <Hidden smUp>
            {
                invoice.items.map((item, index) => (
                    <div key={index} className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                        display.mb1, )}>
                        <Typography className={classNames()}>
                            <spna className={classNames(text.font7, 'theme-text')}>{ item.name }</spna><br />
                            <span className={classNames(classes.textLightPurple, text.font7)}>
                                { item.quantity } x £ { item.price }
                            </span>
                        </Typography>
                        <Typography className={classNames(text.font7, 'theme-text')}>£ { item.total }</Typography>
                    </div>
                ))
            }
        </Hidden>
        { getItemsAsTable() }
        </> : <></>
    }, [ classes, display, getItemsAsTable, invoice, text ]);

    useEffect(() => {
        if(id) {
            const result = invoicesList.find(item => item.id === id);
            if(result) {
                setInvoice(result);
                setInvoiceToBeDeleted(result);
            }
        }
    }, [ id, invoicesList, setInvoiceToBeDeleted ]);

    return (
        <>
            <div className={classNames(classes.baseContainer, display.flex, display.flexColumn, responsive.mdRow)}>
                <Header />
                <main
                    className={classNames('theme-main-bg', classes.main, responsive.mdAlignStart, display.flexGrow1)}>
                    <div className={classNames(display.pb2)} >
                        <Button 
                            onClick={() => history.push('/')}
                            className={classNames('theme-text')}
                            startIcon={<ArrowBackIosIcon className={classNames(classes.textLightPurple)} />}>
                            Go back
                        </Button>
                    </div>
                    <Paper className={classNames(display.mb2, display.pl1, display.pr1, display.pb1, display.pt1, display.flex, 
                        display.alignCenter, display.justifyBetween, 'theme-background-color')}>
                        <div className={classNames(display.flex, display.justifyBetween, display.alignCenter, 
                            responsive.mdAlignStart, classes.statusContainer)}>
                            <Typography className={classNames(classes.textLightPurple)}>Status</Typography>
                            <Typography className={classNames(text.font7, classes.status, statusRef.current[invoice.status])}>{ invoice.status }</Typography>
                        </div>
                        <div  className={classNames(display.none, display.alignCenter, display.justifyBetween,
                            responsive.smFlex)}>
                            { buttonsMemo }
                        </div>
                    </Paper>
                    <Paper className={classNames(display.pl1, display.pr1, display.pt1, display.pb2, 'theme-background-color')}>
                        <div className={classNames(display.flex, display.justifyBetween, display.flexColumn, responsive.smRow)}>
                            <Typography className={classNames(display.mb2, responsive.smMb0)}>
                                <span className={classNames(classes.textLightPurple)}>#</span>
                                <span className={classNames(text.font7, 'theme-text')}>{ invoice.id }</span><br />
                                <span className={classNames(classes.textLightPurple)}>{ invoice.description }</span>
                            </Typography>
                            <Typography className={classNames(classes.textLightPurple, text.alignLeft)}>
                                <span className={classNames(display.block, text.alignLeft, text.smAlignRight)}>{ invoice.senderAddress?.street}</span>
                                <span className={classNames(display.block, text.alignLeft, text.smAlignRight)}>{ invoice.senderAddress?.city}</span>
                                <span className={classNames(display.block, text.alignLeft, text.smAlignRight)}>{ invoice.senderAddress?.postCode}</span>
                                <span className={classNames(display.block, text.alignLeft, text.smAlignRight)}>{ invoice.senderAddress?.country}</span>
                            </Typography>
                        </div>
                        <div className={classNames(display.flex, display.flexColumn, display.mt3, responsive.smMt2,
                            responsive.smRow, display.justifyBetween)}>
                            <div className={classNames(display.flex, display.mt3, responsive.smMt0,
                                responsive.smJustifyBetween)}>
                                <div>
                                    <Typography gutterBottom className={classNames(classes.textLightPurple)}>Invoice Date</Typography>
                                    <Typography className={classNames(display.mb1, text.font7, 'theme-text')}>{ getDate(invoice.createdAt)}</Typography>
                                    <Typography gutterBottom className={classNames(classes.textLightPurple)}>Payment Due</Typography>
                                    <Typography className={classNames(display.mb1, text.font7, 'theme-text')}>{ getDate(invoice.paymentDue) }</Typography>
                                </div>
                                <BillToContainer hide={false} />
                            </div>
                            <BillToContainer hide={true} />
                            <div className={classNames()}>
                                <Typography gutterBottom className={classNames(classes.textLightPurple)}>Sent to</Typography>
                                <Typography gutterBottom className={classNames(text.font7, 'theme-text')}>{ invoice.clientEmail }</Typography>
                            </div>
                        </div>
                        <div className={classNames(display.mt3, classes.checkout, display.pt1, display.pb1, display.pl1,
                            display.pr1, 'theme-sub-background-color')}>
                                {
                                    getItems()
                                }
                            
                        </div>
                        <div className={classNames(display.flex, display.alignCenter, display.justifyBetween, display.pl1,
                            display.pr1, display.pb2, display.pt2, classes.checkoutTotalBanner, 'theme-sub-background-darker-color')}>
                            <Typography className={classNames(text.textLight, display.opacity7)}>Grand Total</Typography>
                            <Typography variant="h6" className={classNames(text.font7, text.textLight)}>
                                £ { invoice.total }
                            </Typography>
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
            { openCreateInvoice && <CreateInvoice />}
        </>
    );
};

export default Invoice;
