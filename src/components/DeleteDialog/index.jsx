import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useCallback, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import classNames from 'classnames';
import { useTypography } from '../../styles';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteInvoice } from '../../redux/actions';

const DeleteDialog = () => {
    const classes = useStyles();
    const text = useTypography();

    const dispatch = useDispatch();

    const { handleCloseDeleteDialog, getInvoiceToBeDeleted, openDeleteDialog, setOpenDeleteDialog } = useContext(AppContext);

    const history = useHistory();
    const deleteClickHandler = useCallback(() => {
        dispatch(deleteInvoice({
            id: getInvoiceToBeDeleted().id
        }));

        setOpenDeleteDialog(false);
        history.push('/');
    }, [ dispatch, getInvoiceToBeDeleted, history, setOpenDeleteDialog ]);

    return (
        <Dialog onClose={handleCloseDeleteDialog} aria-labelledby="simple-dialog-title" open={openDeleteDialog} classes={{ paper: classNames('theme-background-color') }}>
            <DialogTitle id="simple-dialog-title" className={classNames('theme-text')}>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" className={classNames('theme-text')}>
                    Are you sure you want to delete invoice #{ getInvoiceToBeDeleted().id }? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleCloseDeleteDialog} 
                    className={classNames(classes.buttonPill, classes.editButton)}>
                    cancel
                </Button>
                <Button 
                    onClick={deleteClickHandler} 
                    className={classNames(classes.buttonPill, classes.deleteButton, text.textLight)}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;