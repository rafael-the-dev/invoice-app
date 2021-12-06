import Header from '../../components/Header';
import { Button, FormControlLabel, FormGroup, Checkbox, Grid, Hidden, Paper, Popover, Typography } from '@material-ui/core';
import classNames from 'classnames';
import DefaultButton from '../../components/Button';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../styles';
import { useClasses } from './styles';
import { useState } from 'react';
import data from '../../data.json';
import ReportCard from '../../components/ReportCard';
import { useCallback } from 'react';

const Home = () => {
    const display = useDisplay();
    const classes = useClasses();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

    const [ anchorEl, setAnchorEl ] = useState(false);
    const [ state, setState ] = useState({
        draft: true,
        pending: true,
        paid: false,
    });
   // const [ invoicesList, setInvoiceList ] = useState([]);

    const getFilteredInvoices = useCallback(() => {
        let filter = []; 
        Object.entries(state).forEach(currentValue => {
            if(currentValue[1]) {
                filter.push(...data.filter(invoice => invoice.status.toLowerCase() === currentValue[0]));
            }
        }, []);
        if(filter.length > 0)
            return filter;
        else 
            return data;
    }, [ state ])

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
        <main className={classNames(classes.baseContainer, display.flex, display.flexColumn, responsive.mdRow)}>
            <Header />
            <Grid container component="main" 
                className={classNames(classes.main, responsive.mdAlignStart)}>
                <Grid item container alignItems="center" component="section" xs={12}>
                    <Grid item component={Paper} elevation={0} xs={3} sm={4} md={4}>
                        <Typography component="h1" variant="h6" className={classNames(text.font7)}>
                            Invoices
                        </Typography>
                        <Typography component="p" variant="body2" className={classNames()}>
                            <Hidden xsDown>There are</Hidden> 7 <Hidden only="xs">total</Hidden> invoices
                        </Typography>
                    </Grid>
                    <Grid item component={Paper} elevation={0} xs={9} sm={8} md={8} className={classNames(display.flex, 
                        display.alignCenter, display.justifyEnd)}>
                        <div className={classNames(classes.popoverContainer)}>
                            <Button 
                                aria-describedby={popoverId}
                                aria-haspopup="true" 
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
                                        control={<Checkbox checked={paid} onChange={checkboxSelectHandler} name="paid" />}
                                        label="Paid"
                                    />
                                </FormGroup>
                            </Popover>
                        </div>
                        <DefaultButton 
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
                            getFilteredInvoices().map((item, index) => (
                                <Grid item xs={12} key={index} className={classNames(classes.cardContainer)}>
                                    <ReportCard report={item} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </main>
    );
};

export default Home;