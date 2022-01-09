import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { useCallback, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import classNames from 'classnames';
import { useTypography } from '../../styles';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';

const DeleteDialog = () => {
    const classes = useStyles();
    const text = useTypography();
    const { handleCloseDeleteDialog, getInvoiceToBeDeleted, openDeleteDialog, setInvoiceList, setOpenDeleteDialog } = useContext(AppContext);

    const history = useHistory();
    const deleteClickHandler = useCallback(() => {
        setInvoiceList(oldList => {
            const list = [ ...oldList ];
            const result = list.filter(item => item.id !== getInvoiceToBeDeleted().id);
            return result;
        }, []);
        setOpenDeleteDialog(false);
        history.push('/');
    }, [ getInvoiceToBeDeleted, history, setInvoiceList, setOpenDeleteDialog ]);

    return (
        <Dialog onClose={handleCloseDeleteDialog} aria-labelledby="simple-dialog-title" open={openDeleteDialog}>
            <DialogTitle id="simple-dialog-title">Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
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