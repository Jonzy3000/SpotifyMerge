import React from "react"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import NewPlayistDialog from "../components/newPlaylistDialog"
import { Playlists } from "../../spotifyApi/requests/playlists";
import PropTypes from 'prop-types'

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 2
    }
});

class NewPlayistDialogContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            radioValue: "private",
            name: "",
            description: "",
            onSuccess: props.onSuccess
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

    }

    createPlaylist() {
        const { description, name } = this.state;
        Playlists.createPlaylist({
            name: name,
            description: description

        }).then((resp) => {
            if (resp.status === 201) {
                this.state.onSuccess(resp.data.id);
            }
        });
    }

    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleCreate() {
        this.createPlaylist();
        this.handleClose();
    }

    handleRadioChange(event) {
        this.setState({ radioValue: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={this.handleClickOpen}
                    fullWidth
                    size="large"
                >
                    <AddIcon />
                    New Playlist
                </Button>
                <NewPlayistDialog
                    open={this.state.open}
                    handleCreate={this.handleCreate}
                    handleClose={this.handleClose}
                    radioValue={this.state.radioValue}
                    handleDescriptionChange={this.handleDescriptionChange}
                    handleNameChange={this.handleNameChange}
                    handleRadioChange={this.handleRadioChange}
                />

            </div >
        );
    }
}

NewPlayistDialogContainer.propTypes = {
    onSuccess: PropTypes.func.isRequired
}

export default withStyles(styles)(NewPlayistDialogContainer);