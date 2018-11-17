import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';

import { FormControl, RadioGroup, FormLabel, FormControlLabel } from "@material-ui/core";

const styles = theme => ({
    textField: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 2
    },
    dialogTitle: {
        backgroundColor: "#f9f7f9"
    },
    button: {
        marginBottom: theme.spacing.unit * 2
    }
});

class NewPlayistDialogContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            radioValue: "private"
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleRadioChange(event) {
        this.setState({ radioValue: event.target.value });
    }

    render() {
        const { fullScreen, classes } = this.props;
        return (
            <div>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={this.handleClickOpen}
                    fullWidth
                >
                    <AddIcon />
                    New Playlist
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    fullWidth
                >
                    <DialogTitle className={classes.dialogTitle} id="responsive-dialog-title">{"Create Playlist"}</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth className={classes.formControl}>
                            <TextField
                                className={classes.textField}
                                autoFocus
                                id="name"
                                label="Name"
                                fullWidth
                                required
                                variant="outlined"
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
                            />
                            <FormLabel>
                                Visibility
                            </FormLabel>
                            <RadioGroup
                                name="visiblity"
                                value={this.state.radioValue}
                                onChange={this.handleRadioChange}
                            >
                                <FormControlLabel value="private" control={<Radio />} label="Private" />
                                <FormControlLabel value="public" control={<Radio />} label="Public" />
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

export default withStyles(styles)(withMobileDialog()(NewPlayistDialogContainer));