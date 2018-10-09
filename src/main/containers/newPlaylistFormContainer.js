import React from "react";
import PropTypes from "prop-types";
import Playlists from "../../spotifyApi/requests/playlists";
import NewPlaylistForm from "../components/newPlaylistForm";

class NewPlaylistFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onSuccess: props.onSuccess,
            onFail: props.onFail,
            isVisible: props.isVisible,
            name: "",
            description: "",
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ isVisible: props.isVisible })
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

    onSuccessClick() {
        this.createPlaylist();
    }

    render() {
        return (
            <NewPlaylistForm
                onNameChange={(name) => { this.setState({ name }) }}
                onDescriptionChange={(description) => { this.setState({ description }) }}
                onSuccessClick={() => { this.onSuccessClick() }}
                isVisible={this.state.isVisible}
            />
        )
    }
}

NewPlaylistFormContainer.propTypes = {
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
    isVisible: PropTypes.bool,
}

export default NewPlaylistFormContainer;
