import { useStyles } from './styles';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../../styles';
import classNames from 'classnames';
import { Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ItemCard = () => {
    const display = useDisplay();
    const classes = useStyles();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

   return (
        <Grid item xs={12} className={classNames(display.flex, display.flexColumn, display.alignStretch)}>
            <div className={classNames(display.flex, display.flexColumn, classes.invoiceDateContainer)}>
                <label 
                    className={classNames(classes.defaultLabel, classes.textPurple)} 
                    htmlFor='item-name-field'>Item Name</label>
                <input 
                    id="item-name-field" 
                    placeholder='Item Name'
                    className={classNames(classes.defaultInput)} 
                />
            </div>
            <Grid container className={classNames(display.mt2)}>
                <Grid item xs={3} sm={4}>
                    <div className={classNames(display.flex, display.flexColumn, classes.marginRight)}>
                        <label 
                            className={classNames(classes.defaultLabel, classes.textPurple)} 
                            htmlFor='quantity-field'>Qty</label>
                        <input 
                            id="quantity-field" 
                            value="1"
                            className={classNames(classes.defaultInput)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                    <div className={classNames(display.flex, display.flexColumn, classes.marginRight)}>
                        <label 
                            className={classNames(classes.defaultLabel, classes.textPurple)} 
                            htmlFor='price-field'>Price</label>
                        <input 
                            id="price-field" 
                            placeholder='Price'
                            className={classNames(classes.defaultInput)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={3} sm={4}>
                    <div className={classNames(display.flex, display.flexColumn, classes.marginRight,
                        responsive.smMt0)}>
                        <label 
                            className={classNames(classes.defaultLabel, classes.textPurple)} 
                            htmlFor='total-field'>Total</label>
                        <input 
                            id="total-field" 
                            value="156.00"
                            type="number"
                            readOnly
                            className={classNames(classes.defaultInput, display.borderNone, display.outlineNone, 
                            display.pl0, classes.textPurple)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} className={classNames(display.flex, display.alignCenter)}>
                    <div className={classNames(display.flex, display.flexColumn, classes.countryContainer,
                        responsive.smMt0)}>
                        <IconButton>
                            <DeleteIcon classes={{ root: classNames(classes.textPurple)}} />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
        </Grid>
   )
};

export default ItemCard;