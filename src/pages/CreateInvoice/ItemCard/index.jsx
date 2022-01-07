import { useStyles } from './styles';
import { useDisplay, useResponsive } from '../../../styles';
import classNames from 'classnames';
import { Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useEffect, useRef } from 'react'

const ItemCard = ({ index, setItemList, setProductsList, productsList }) => {
    const display = useDisplay();
    const classes = useStyles();
    //const bg = useBackground();
    const responsive = useResponsive();
    //const text = useTypography();
    const nameRef = useRef(null);
    const quantityRef = useRef(null);
    const priceRef = useRef(null);
    const totalRef = useRef(null);
    const refs = useRef({ name: nameRef, quantity: quantityRef, price: priceRef })

    const deleteHandler = () => {
        setItemList(list => list.filter((item) => item.props.index !== index));
        setProductsList(list => {
            let newList = {};
            Object.entries(list).forEach(tuple => {
                if(tuple[0] !== index) {
                    newList = { ...newList, [tuple[0]]: tuple[1]};
                }
            });
            console.log(newList)
            return newList;
        })
    };

    const changeHandler = prop => event => {
        refs.current[prop].current.value = event.target.value;
        setProductsList(oldList => {
            const list = { ...oldList };
            list[index][prop] = event.target.value;
            if(['price', 'quantity'].includes(prop)) {
                const total = parseFloat(list[index]['price']) * parseFloat(list[index]['quantity']);
                list[index]['total'] = total;
                totalRef.current.value = total;
            }
            return list;
        })
    };

    const autoFill = useRef(true);
    useEffect(() => {
        if((autoFill.current) && Boolean(productsList[index])) {
            nameRef.current.value = productsList[index].name
            quantityRef.current.value = productsList[index].quantity
            priceRef.current.value = productsList[index].price
            totalRef.current.value = productsList[index].total
            autoFill.current = false;
        }
    }, [ index, productsList ]);

   return (
        <Grid item xs={12} className={classNames(display.flex, display.flexColumn, display.alignStretch)}>
            <div className={classNames(display.flex, display.flexColumn, classes.invoiceDateContainer, display.mt2)}>
                <label 
                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                    htmlFor='item-name-field'>Item Name</label>
                <input 
                    id="item-name-field" 
                    placeholder='Item Name'
                    ref={nameRef}
                    onChange={changeHandler('name')}
                    className={classNames(classes.defaultInput)} 
                />
            </div>
            <Grid container className={classNames(display.mt1)}>
                <Grid item xs={3}>
                    <div className={classNames(display.flex, display.flexColumn, classes.marginRight)}>
                        <label 
                            className={classNames(classes.defaultLabel, classes.textPurple)} 
                            htmlFor='quantity-field'>Qty</label>
                        <input 
                            id="quantity-field" 
                            ref={quantityRef}
                            onChange={changeHandler('quantity')}
                            className={classNames(classes.defaultInput)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classNames(display.flex, display.flexColumn, classes.marginRight)}>
                        <label 
                            className={classNames(classes.defaultLabel, classes.textPurple)} 
                            htmlFor='price-field'>Price</label>
                        <input 
                            id="price-field" 
                            placeholder='Price'
                            ref={priceRef}
                            onChange={changeHandler('price')}
                            className={classNames(classes.defaultInput)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classNames(display.flex, display.flexColumn, classes.marginRight,
                        responsive.smMt0)}>
                        <label 
                            className={classNames(classes.defaultLabel, classes.textPurple)} 
                            htmlFor='total-field'>Total</label>
                        <input 
                            id="total-field" 
                            type="number"
                            ref={totalRef}
                            readOnly
                            className={classNames(classes.defaultInput, display.borderNone, display.outlineNone, 
                            display.pl0, classes.textPurple)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={2} className={classNames(display.flex, display.alignCenter)}>
                    <div className={classNames(display.flex, display.flexColumn, classes.countryContainer,
                        responsive.smMt0)}>
                        <IconButton onClick={deleteHandler}>
                            <DeleteIcon classes={{ root: classNames(classes.textPurple)}} />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
        </Grid>
   )
};

export default ItemCard;