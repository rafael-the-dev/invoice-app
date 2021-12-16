import { useStyles } from './styles'
import { Button, Dialog, DialogContent, DialogTitle, FormGroup, Checkbox, Grid, Hidden, Paper, Popover, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../styles';
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';

const CreateInvoice = () => {
    const display = useDisplay();
    const classes = useStyles();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

    const { closeCreateInvoice, isCreateNewInvoiceDialog, openCreateInvoice } = useContext(AppContext);
    const [paymentTerm, setPaymentTerm] = useState('Net 30 Day');

    const paymentsTerms = [
        {
          value: 'Net 1 Day',
          label: 'Net 1 Day',
        },
        {
          value: 'Net 7 Day',
          label: 'Net 7 Day',
        },
        {
          value: 'Net 14 Day',
          label: 'Net 14 Day',
        },
        {
          value: 'Net 30 Day',
          label: 'Net 30 Day',
        },
    ];

    const handleChange = (event) => {
        setPaymentTerm(event.target.value);
      };

    return (
        <Dialog 
            onClose={closeCreateInvoice} 
            aria-labelledby="dialog-title" 
            classes={{ root: classes.dialogRoot, scrollPaper: classNames(display.alignStart, responsive.smJustifyStart), paper: classes.dialogPaper}} 
            open={openCreateInvoice}>
            <DialogTitle id="dialog-title">{ isCreateNewInvoiceDialog ? 'New Invoice' : 'Edit #XM9141' }</DialogTitle>
            <DialogContent>
                <form className={classNames(display.flex, display.flexColumn, display.alignStretch)}>
                    <fieldset className={classNames(display.flex, display.flexColumn, display.alignStretch)}>
                        <legend className={classNames(text.font7, classes.textPurple)} >Bill From</legend>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label className={classNames(classes.defaultLabel, classes.textPurple)} htmlFor='street-address'>Street Address</label>
                            <input 
                                id="street-address" 
                                placeholder='Street Address'
                                className={classNames(classes.defaultInput)} 
                            />
                        </div>
                        <Grid container className={classNames(display.mt1)}>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.cityContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='city'>City</label>
                                    <input 
                                        id="city" 
                                        placeholder='City'
                                        className={classNames(classes.defaultInput)} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.postCodeContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='street-address'>Post Code</label>
                                    <input 
                                        id="post-code" 
                                        placeholder='Post Code'
                                        className={classNames(classes.defaultInput)} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, display.mt1, classes.countryContainer,
                                    responsive.smMt0)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='country'>Country</label>
                                    <input 
                                        id="country" 
                                        placeholder='Country'
                                        className={classNames(classes.defaultInput)} 
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </fieldset>
                    <fieldset className={classNames(display.flex, display.flexColumn, display.alignStretch, display.mt2)}>
                        <legend className={classNames(text.font7, classes.textPurple)} >Bill To</legend>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label 
                                className={classNames(classes.defaultLabel, classes.textPurple)} 
                                htmlFor='client-name'>Client's Name</label>
                            <input 
                                id="client-name" 
                                placeholder="Client's Name"
                                className={classNames(classes.defaultInput)} 
                            />
                        </div>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label 
                                className={classNames(classes.defaultLabel, classes.textPurple)} 
                                htmlFor='client-email'>Client's Email</label>
                            <input 
                                id="client-email" 
                                type="email"
                                placeholder="e.g. email@example.com"
                                className={classNames(classes.defaultInput)} 
                            />
                        </div>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label 
                                className={classNames(classes.defaultLabel, classes.textPurple)} 
                                htmlFor='client-street-address'>Street Address</label>
                            <input 
                                id="client-street-address" 
                                placeholder="Street Address"
                                className={classNames(classes.defaultInput)} 
                            />
                        </div>
                        <Grid container className={classNames(display.mt1)}>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.cityContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='client-city'>City</label>
                                    <input 
                                        id="client-city" 
                                        placeholder='City'
                                        className={classNames(classes.defaultInput)} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.postCodeContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='client-post-code'>Post Code</label>
                                    <input 
                                        id="client-post-code" 
                                        placeholder='Post Code'
                                        className={classNames(classes.defaultInput)} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, display.mt1, classes.countryContainer,
                                    responsive.smMt0)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='client-country'>Country</label>
                                    <input 
                                        id="client-country" 
                                        placeholder='Country'
                                        className={classNames(classes.defaultInput)} 
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </fieldset>
                    <Grid container className={classNames(display.mt1)}>
                        <Grid item xs={12} sm={6}>
                            <div className={classNames(display.flex, display.flexColumn, classes.cityContainer)}>
                                <label 
                                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                                    htmlFor='invoice-date'>Invoice Date</label>
                                <input 
                                    id="invoice-date" 
                                    type="date"
                                    placeholder='date'
                                    className={classNames(classes.defaultInput)} 
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classNames(display.flex, display.flexColumn, classes.countryContainer,
                                display.mt1)}>
                                <label 
                                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                                    htmlFor='payment-term'>
                                    Payment Terms
                                </label>
                                <TextField
                                    id="payment-term"
                                    select
                                    label=""
                                    fullWidth
                                    value={paymentTerm}
                                    onChange={handleChange}
                                    variant="outlined"
                                    helperText=""
                                    classes={{ root: classes.paymnetTermRoot}}
                                    className={classNames(classes.paymnetTerm, classes.countryContainer)}
                                    >
                                    {
                                        paymentsTerms.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classNames(display.flex, display.flexColumn, display.mt1, display.mb2)}>
                                <label 
                                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                                    htmlFor='project-description'>Project Description</label>
                                <textarea
                                    id="project-description" 
                                    rows="1"
                                    placeholder='e.g. Graphic Design Service'
                                    className={classNames(classes.defaultInput)} 
                                ></textarea>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateInvoice;