import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, RadioGroup, FormLabel, FormControlLabel } from "@material-ui/core";
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    dialogTitle: {
        backgroundColor: "#f9f7f9"
    }
});

const NewPlaylistDialog = props => {
    const {
        fullScreen, classes, open, radioValue,
        handleCreate, handleClose,
        handleNameChange, handleDescriptionChange, handleRadioChange,
    } = props;
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            fullWidth
        >
            <DialogTitle className={classes.dialogTitle} id="responsive-dialog-title">{"Create Playlist"}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <TextField
                        className={classes.textField}
                        autoFocus
                        id="name"
                        label="Name"
                        fullWidth
                        required
                        variant="outlined"
                        onChange={handleNameChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="description"
                        label="Description"
                        fullWidth
                        rows="4"
                        rowsMax="4"
                        multiline
                        variant="outlined"
                        onChange={handleDescriptionChange}
                    />
                    <FormLabel>
                        Visibility
                </FormLabel>
                    <RadioGroup
                        name="visiblity"
                        value={radioValue}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleCreate} color="primary" autoFocus>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    );
}

NewPlaylistDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleDescriptionChange: PropTypes.func.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    radioValue: PropTypes.string.isRequired
}

export default withStyles(styles)(withMobileDialog()(NewPlaylistDialog));