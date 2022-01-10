import Header from '../../components/Header';
import { Button, FormControlLabel, FormGroup, Checkbox, Grid, Hidden, Paper, Popover, Typography } from '@material-ui/core';
import classNames from 'classnames';
import DefaultButton from '../../components/Button';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../styles';
import { useClasses } from './styles';
import { useContext, useEffect, useState } from 'react';
import ReportCard from '../../components/ReportCard';
import { useCallback } from 'react';
import { ThemeContext } from '../../context/ThemeContext'
import { useTheme } from '../../theme/styles'
import { AppContext } from '../../context/AppContext';
import CreateInvoice from '../CreateInvoice';
import emptyIllustration from '../../assets/images/illustration-empty.svg';

const Home = () => {
    const display = useDisplay();
    const classes = useClasses();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

    const { displayCreateInvoice, invoicesList, openCreateInvoice } = useContext(AppContext);

    const { theme } = useContext(ThemeContext);
    const themeStyles = useTheme(theme);

    const [ anchorEl, setAnchorEl ] = useState(false);
    const [ state, setState ] = useState({
        draft: true,
        pending: true,
        paid: false,
    });
   // const [ invoicesList, setInvoiceList ] = useState([]);
   useEffect(() => {
       console.log(themeStyles.mainBg, theme);
   }, [theme, themeStyles]);

    const getFilteredInvoices = useCallback(() => {
        let filter = []; 
        Object.entries(state).forEach(currentValue => {
            if(currentValue[1]) {
                filter.push(...invoicesList.filter(invoice => invoice.status.toLowerCase() === currentValue[0]));
            }
        }, []);
        return filter;
        if(filter.length > 0)
            return filter;
        else 
            return invoicesList;
    }, [ state, invoicesList ])

    const { draft, paid, pending } = state;
    const popoverId = anchorEl ? 'popover' : undefined;
    const checkboxSelectHandler = event => {
        const name = event.target.getAttribute('name');
        setState(oldState => ({...oldState, [name.toLowerCase()]: !oldState[name]}));
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <div className={classNames(classes.baseContainer, display.flex, display.flexColumn, responsive.mdRow)}>
            <Header />
            <Grid container component="main" 
                className={classNames(classes.main, responsive.mdAlignStart, themeStyles.mainBg)}>
                <Grid item container alignItems="center" component="section" xs={12}>
                    <Grid item component={Paper} elevation={0} xs={3} sm={4} md={4} className={classNames(bg.transparent)}>
                        <Typography component="h1" variant="h6" className={classNames(text.font7, themeStyles.darkWhiteText)}>
                            Invoices
                        </Typography>
                        <Typography component="p" variant="body2" className={classNames(display.opacity8, themeStyles.darkWhiteText)}>
                            <Hidden xsDown>There are</Hidden> 7 <Hidden only="xs">total</Hidden> invoices
                        </Typography>
                    </Grid>
                    <Grid item component={Paper} elevation={0} xs={9} sm={8} md={8} className={classNames(display.flex, 
                        display.alignCenter, display.justifyEnd, bg.transparent)}>
                        <div className={classNames(classes.popoverContainer)}>
                            <Button 
                                aria-describedby={popoverId}
                                aria-haspopup="true" 
                                className={classNames(themeStyles.darkWhiteText)}
                                onClick={handleClick}>
                                Filter<Hidden xsDown> by status</Hidden>
                            </Button>
                            <Popover
                                id={popoverId}
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                                >
                                <FormGroup className={classNames(classes.checkboxGroup)}>
                                    <FormControlLabel
                                        control={<Checkbox checked={draft} onChange={checkboxSelectHandler} name="draft" />}
                                        label="Draft"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={pending} onChange={checkboxSelectHandler} name="pending" />}
                                        label="Pending"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={paid} onChange={checkboxSelectHandler} name="paidd" />}
                                        label="Paid"
                                    />
                                </FormGroup>
                            </Popover>
                        </div>
                        <DefaultButton 
                            clickHandler={displayCreateInvoice(true)}
                            className={classNames(classes.newInvoiceButton)}
                            startIcon={<span className={classNames(bg.noRepeat, bg.center, 
                            classes.startIcon)} ></span> } 
                        >
                            <>New <Hidden only="xs">Invoices</Hidden></>
                        </DefaultButton>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classNames(classes.wrapper)}>
                    <Grid container className={classNames(classes.cardsWrapper)}>
                        {
                            getFilteredInvoices().length > 0 ? getFilteredInvoices().map((item, index) => (
                                <Grid item xs={12} key={index} className={classNames(classes.cardContainer)}>
                                    <ReportCard report={item} />
                                </Grid>
                            )) : (
                                <section className={classNames(display.flex, display.flexColumn, display.alignCenter, 
                                    display.w100, display.mt2)}>
                                    <div>
                                        <img 
                                            src={emptyIllustration} 
                                            alt='' 
                                            className={classNames(display.block, display.h100, display.w100)}
                                        />
                                    </div>
                                    <Typography gutterBottom variant="h6" className={classNames(text.font7, display.mt2)}>
                                        There is nothing here
                                    </Typography>
                                    <Typography variant="body2" className={classNames(text.alignCenter)}>
                                        Create a new invoice by clicking<br/>the New Invoice button and get started
                                    </Typography>
                                </section>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            { openCreateInvoice && <CreateInvoice />}
        </div>
    );
};

export default Home;