import { useStyles } from './styles'
import { Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Typography, } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import { useDisplay, useResponsive, useTypography } from '../../styles';
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { AppContext } from '../../context/AppContext';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import ItemCard from './ItemCard';
import nextId from "react-id-generator";
import { useForm } from "react-hook-form";
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { addInvoice, editInvoice } from '../../redux/actions';

const CreateInvoice = () => {
    const display = useDisplay();
    const classes = useStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const dispatch = useDispatch();

    const { closeCreateInvoice, getSelectedInvoice, isCreateNewInvoiceDialog, 
        openCreateInvoice, setInvoiceList, setSelectedInvoice } = useContext(AppContext);
    const [paymentTerm, setPaymentTerm] = useState('Net 30 Day');
    const [ itemsList, setItemList ] = useState([ ]);
    const [ productsList, setProductsList ] = useState({});
    const nextProductID = useRef('');
    const generateNewProduct = useRef(false);

    useEffect(() => {
        const index = nextId();
        nextProductID.current = index;
        setProductsList(list => ({ ...list, [index]: { name: '', quantity: 0, price: 0, total: 0}}));
    }, []);

    useEffect(() => {
        if(generateNewProduct.current) {
            const index = nextId();
            nextProductID.current = index;
            setProductsList(list => {
                const newlist = { ...list, [index]: { name: '', quantity: 0, price: 0, total: 0}};
                console.log('new list', newlist, index);
                return newlist;
            });
            generateNewProduct.current = false;
        }
    }, [ itemsList ]);

    const paymentsTerms = [
        {
          value: 1,
          label: 'Net 1 Day',
        },
        {
          value: 7,
          label: 'Net 7 Day',
        },
        {
          value: 14,
          label: 'Net 14 Day',
        },
        {
          value: 30,
          label: 'Net 30 Day',
        },
    ];

    const handleChange = (event) => {
        setPaymentTerm(event.target.value);
    };

    const nextItemCard = useCallback(() => {
        return (
            <ItemCard 
                key={nextProductID.current} 
                index={nextProductID.current} 
                setItemList={setItemList} 
                setProductsList={setProductsList} 
                productsList={productsList} 
            />
        )
    }, [ productsList ])

    const addItemClickHandler = () => {
        setItemList(list => [ ...list,  nextItemCard() ]);
        generateNewProduct.current = true;
        setHasItemsError(false);
    };

    const itemListMemo = useMemo(() => itemsList, [ itemsList ]);

    const getTotalPrice = useCallback(() => {
        let total = 0;

        Object.values(productsList).forEach(item => {
            total += parseFloat(item['total'])
        });

        return total;
    }, [ productsList ]);

    const getRandomLetter = useCallback(() => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        return letters[Math.floor(Math.random() * letters.length)].toUpperCase();
    }, []);

    const getRandomNumber = useCallback(() => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        return numbers[Math.floor(Math.random() * numbers.length)];
    }, []);

    const invoiceID = useRef('');
    const generateInvoiceID = useCallback(() => {
        invoiceID.current = `${getRandomLetter()}${getRandomLetter()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`;
    }, [ getRandomLetter, getRandomNumber ]);
    useEffect(() => {
        generateInvoiceID();
    }, [ generateInvoiceID ]);

    const createInvoice = useCallback((data) => {
        return {
            "id": invoiceID.current,
            "createdAt": data['invoice-date'],
            "paymentDue": new Date(moment(data['invoice-date']).add(data['payment-term'], 'days')),
            "description": data['project-description'],
            "paymentTerms": data['payment-term'],
            "clientName": data['client-name'],
            "clientEmail": data['client-email'],
            "status": "pending",
            "senderAddress": {
              "street": data['street-address'],
              "city": data['city'],
              "postCode": data['post-code'],
              "country": data['country']
            },
            "clientAddress": {
              "street": data['client-street-address'],
              "city": data['client-city'],
              "postCode":data['client-post-code'],
              "country": data['client-country']
            },
            "items": Object.values(productsList).filter(item => item.quantity > 0),
            "total": getTotalPrice()
        };
    }, [ getTotalPrice, productsList ]);

    const [ hasItemsError, setHasItemsError ] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues , reset, setValue  } = useForm();
    const onSubmit = data => {
        if(getTotalPrice() > 0) {
            const newItem = createInvoice(data)
            dispatch(addInvoice({
                invoice: newItem
            }));
            reset();
            generateInvoiceID()
        }
    }
    const saveHandler = event => {
        event.preventDefault();

        if(getTotalPrice() === 0) {
            setHasItemsError(true);
        }
        const func  = f => f();
        func(handleSubmit(onSubmit));
    };

    const canIGenerateItems = useRef(false);

    useEffect(() => {
        canIGenerateItems.current = false;
        generateNewProduct.current = false;
    }, []);

    useEffect(() => {
        const selectedInvoice = getSelectedInvoice();
        if(!isCreateNewInvoiceDialog && Boolean(selectedInvoice)) {
            setValue('street-address', selectedInvoice['senderAddress']['street']);
            setValue('city', selectedInvoice['senderAddress']['city']);
            setValue('post-code', selectedInvoice['senderAddress']['postCode']);
            setValue('country', selectedInvoice['senderAddress']['country']);

            
            setValue('client-name', selectedInvoice['clientName']);
            setValue('client-email', selectedInvoice['clientEmail']);
            setValue('client-street-address', selectedInvoice['clientAddress']['street']);
            setValue('client-city', selectedInvoice['clientAddress']['city']);
            setValue('client-post-code', selectedInvoice['clientAddress']['postCode']);
            setValue('client-country', selectedInvoice['clientAddress']['country']);

            
            setValue('invoice-date', selectedInvoice['createdAt']);
            setValue('payment-term', selectedInvoice['paymentTerms']);
            setValue('project-description', selectedInvoice['description']);

            const items = selectedInvoice['items'];
            let index = nextId();
            let list = {};
            items.forEach(item => {
                list = { ...list, [index]: item}
                index = nextId();
            });
            nextProductID.current = index;
            canIGenerateItems.current = true;
            generateNewProduct.current = true;
            setProductsList(list);
        }
            
    }, [ getSelectedInvoice, isCreateNewInvoiceDialog, setValue ]);

    useEffect(() => {
        if((Object.keys(productsList).length > 0) && (canIGenerateItems.current)) {
            canIGenerateItems.current = false;
            const list = Object.keys(productsList).map(key => (
                <ItemCard 
                    key={key} 
                    index={key} 
                    setItemList={setItemList} 
                    setProductsList={setProductsList} 
                    productsList={productsList} 
                />
            ));
            setItemList(list);
        }
    }, [ productsList ]);
    const getEditedInvoice = useCallback(({ id, status }) => {
        return {
            "id": id ? id : getSelectedInvoice().id,
            "createdAt": getValues('invoice-date'),
            "paymentDue": new Date(moment(getValues('invoice-date')).add(getValues('payment-term'), 'days')),
            "description": getValues('project-description'),
            "paymentTerms": getValues('payment-term'),
            "clientName": getValues('client-name'),
            "clientEmail": getValues('client-email'),
            "status": status ? status : "pending",
            "senderAddress": {
              "street": getValues('street-address'),
              "city":  getValues('city'),
              "postCode": getValues('post-code'),
              "country": getValues('country')
            },
            "clientAddress": {
              "street": getValues('client-street-address'),
              "city": getValues('client-city'),
              "postCode": getValues('client-post-code'),
              "country": getValues('client-country')
            },
            "items": Object.values(productsList).filter(item => item.quantity > 0),
            "total": getTotalPrice()
        }
    }, [ getSelectedInvoice, getValues, getTotalPrice, productsList ]);

    const saveAsDraftClickHandler = useCallback(() => {
        const newItem = getEditedInvoice({ id: invoiceID.current, status: 'draft'})
        setInvoiceList(list => [...list, newItem]);
        reset();
        generateInvoiceID();
    }, [ generateInvoiceID, getEditedInvoice, reset, setInvoiceList ]);

    const editClickHandler = useCallback(() => {
        dispatch(editInvoice({
            id: getSelectedInvoice().id,
            invoice: getEditedInvoice({}),
            helperFunction: () => { setSelectedInvoice({ ...getEditedInvoice({}), id: ''}); reset() }
        }));
    }, [ dispatch, getEditedInvoice, getSelectedInvoice, reset, setSelectedInvoice ]);

    return (
        <Dialog 
            onClose={closeCreateInvoice} 
            aria-labelledby="dialog-title" 
            classes={{ root: classes.dialogRoot, scrollPaper: classNames(display.alignStart, responsive.smJustifyStart), paper: classNames(classes.dialogPaper, 'theme-main-bg')}} 
            open={openCreateInvoice}>
            <DialogTitle id="dialog-title" classes={{ root: classNames(classes.dialogTitle, display.mt1, 'theme-text')}}>
                { isCreateNewInvoiceDialog ? 'New Invoice' : <>Edit { getSelectedInvoice().id && <span className={classNames(classes.textPurple)}>#</span> }{ getSelectedInvoice().id}</> }
            </DialogTitle>
            <DialogContent className={classNames(display.pl0, display.pr0)}>
                { Object.keys(errors).length > 0 && <Alert 
                    severity="error"
                    className={classNames(display.mb1)}>
                    Fill in all form fields!
                </Alert>
                }
                <form className={classNames(display.flex, display.flexColumn, display.alignStretch)}>
                    <fieldset className={classNames(display.flex, display.flexColumn, display.alignStretch, 
                        classes.px)}>
                        <legend className={classNames(text.font7, classes.textPurple)} >Bill From</legend>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label className={classNames(classes.defaultLabel, classes.textPurple)} htmlFor='street-address'>Street Address</label>
                            <input 
                                {...register("street-address", { required: true })}
                                placeholder='Street Address'
                                className={classNames(classes.defaultInput, 
                                {[classes.error]: Boolean(errors['street-address'])}, 'theme-background-color', 'theme-text')} 
                            />
                        </div>
                        <Grid container className={classNames(display.mt1)}>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.cityContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='city'>City</label>
                                    <input 
                                        {...register("city", { required: true })}
                                        placeholder='City'
                                        className={classNames(classes.defaultInput, 
                                        {[classes.error]: Boolean(errors['city'])}, 'theme-background-color', 'theme-text')} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.postCodeContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='post-code'>Post Code</label>
                                    <input 
                                        {...register("post-code", { required: true })}
                                        placeholder='Post Code'
                                        className={classNames(classes.defaultInput, 
                                        'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['post-code'])})} 
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
                                        {...register("country", { required: true })}
                                        placeholder='Country'
                                        className={classNames(classes.defaultInput, 
                                        'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['country'])})} 
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </fieldset>
                    <fieldset className={classNames(display.flex, display.flexColumn, display.alignStretch, 
                        display.mt2, classes.px)}>
                        <legend className={classNames(text.font7, classes.textPurple)} >Bill To</legend>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label 
                                className={classNames(classes.defaultLabel, classes.textPurple)} 
                                htmlFor='client-name'>Client's Name</label>
                            <input 
                                {...register("client-name", { required: true })}
                                placeholder="Client's Name"
                                className={classNames(classes.defaultInput, 
                                'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['client-name'])})} 
                            />
                        </div>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label 
                                className={classNames(classes.defaultLabel, classes.textPurple)} 
                                htmlFor='client-email'>Client's Email</label>
                            <input 
                                {...register("client-email", { required: true })}
                                type="email"
                                placeholder="e.g. email@example.com"
                                className={classNames(classes.defaultInput, 
                                'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['client-email'])})} 
                            />
                        </div>
                        <div className={classNames(display.flex, display.flexColumn, display.mt1)}>
                            <label 
                                className={classNames(classes.defaultLabel, classes.textPurple)} 
                                htmlFor='client-street-address'>Street Address</label>
                            <input 
                                {...register("client-street-address", { required: true })}
                                placeholder="Street Address"
                                className={classNames(classes.defaultInput, 
                                'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['client-street-address'])})} 
                            />
                        </div>
                        <Grid container className={classNames(display.mt1)}>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.cityContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='client-city'>City</label>
                                    <input 
                                        {...register("client-city", { required: true })}
                                        placeholder='City'
                                        className={classNames(classes.defaultInput, 
                                        'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['client-city'])})} 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <div className={classNames(display.flex, display.flexColumn, classes.postCodeContainer)}>
                                    <label 
                                        className={classNames(classes.defaultLabel, classes.textPurple)} 
                                        htmlFor='client-post-code'>Post Code</label>
                                    <input 
                                        {...register("client-post-code", { required: true })}
                                        placeholder='Post Code'
                                        className={classNames(classes.defaultInput, 
                                        'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['client-post-code'])})} 
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
                                        {...register("client-country", { required: true })}
                                        placeholder='Country'
                                        className={classNames(classes.defaultInput, 
                                        'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['client-country'])})} 
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </fieldset>
                    <Grid container className={classNames(display.mt1, classes.px)}>
                        <Grid item xs={12} sm={6}>
                            <div className={classNames(display.flex, display.flexColumn, classes.invoiceDateContainer)}>
                                <label 
                                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                                    htmlFor='invoice-date'>Invoice Date</label>
                                <input 
                                    {...register("invoice-date", { required: true })}
                                    type="date"
                                    placeholder='date'
                                    className={classNames(classes.defaultInput, 
                                    'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['invoice-date'])})} 
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classNames(display.flex, display.flexColumn, classes.countryContainer,
                                display.mt1, responsive.mdMt0)}>
                                <label 
                                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                                    htmlFor='payment-term'>
                                    Payment Terms
                                </label>
                                <TextField
                                    {...register("payment-term", { required: true })}
                                    select
                                    label=""
                                    fullWidth
                                    value={paymentTerm}
                                    onChange={handleChange}
                                    variant="outlined"
                                    helperText=""
                                    classes={{ root: classNames(classes.paymnetTermRoot, 'theme-text')}}
                                    className={classNames(classes.paymnetTerm, classes.countryContainer, 
                                    'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['payment-term'])})}
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
                                    {...register("project-description", { required: true })}
                                    rows="1"
                                    placeholder='e.g. Graphic Design Service'
                                    className={classNames(classes.defaultInput, 
                                    'theme-background-color', 'theme-text', {[classes.error]: Boolean(errors['project-description'])})} 
                                ></textarea>
                            </div>
                        </Grid>
                    </Grid>
                    <fieldset className={classNames(classes.px)}>
                        <legend className={classNames(text.font7, classes.textPurple)} >Item List</legend>
                        <Grid container className={classNames()}>
                            { itemListMemo }
                        </Grid>
                        { hasItemsError && <div>
                            <Typography variant="h6" className={classNames(classes.errorText)}>
                                No items or Products details added 
                            </Typography>
                            </div> 
                        }
                        <Button onClick={addItemClickHandler} className={classNames(classes.buttonPill, classes.editButton, display.mt2, 
                            display.w100, text.font7, 'theme-background-color')}>
                            + Add New Item
                        </Button>
                    </fieldset>
                    <div className={classNames(display.mt1, classes.gradientContainer)}></div>
                    { isCreateNewInvoiceDialog ? (
                        <Paper elevation={0} className={classNames(display.pt1, classes.px, display.pb1, display.flex, display.alignCenter, display.justifyEnd, 'theme-background-color')}>
                            <Button 
                                onClick={closeCreateInvoice}
                                className={classNames(classes.buttonPill, text.rem7, text.font7, classes.editButton)}>Discard</Button>
                            <Button 
                                className={classNames(classes.buttonPill, text.rem7, display.ml1, text.font7, 
                                    text.textLight, classes.saveAsDraft)}
                                onClick={saveAsDraftClickHandler}
                                >Save as Draft</Button>
                            <Button 
                                type="submit"
                                className={classNames(classes.buttonPill, text.rem7, display.ml1, text.font7, text.textLight, classes.saveButton)}
                                onClick={saveHandler}>
                                Save &amp; Send
                            </Button>
                        </Paper>
                    ) : (
                        <Paper elevation={0} className={classNames(display.pt1, classes.px, display.pb1, display.flex, display.alignCenter, display.justifyEnd, 'theme-background-color')}>
                            <Button 
                                className={classNames(classes.buttonPill, text.rem8, text.font7, classes.editButton)}
                                onClick={closeCreateInvoice}>Cancel</Button>
                            <Button 
                                className={classNames(classes.buttonPill, text.rem8, responsive.smMl1, text.font7, 
                                text.textLight, classes.saveButton)}
                                onClick={editClickHandler}>
                                Save Changes
                            </Button>
                        </Paper>
                    ) }
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateInvoice;