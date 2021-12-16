import { useStyles } from './styles'
import { Button, Dialog, FormGroup, Checkbox, Grid, Hidden, Paper, Popover, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useBackground, useDisplay, useResponsive, useTypography } from '../../styles';


const CreateInvoice = () => {
    const display = useDisplay();
    const classes = useStyles();
    const bg = useBackground();
    const responsive = useResponsive();
    const text = useTypography();

    return (
        <Dialog>
            
        </Dialog>
    );
};

export default CreateInvoice;