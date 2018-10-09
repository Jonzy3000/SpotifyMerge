import React from "react";
import { FormGroup, Button, InputGroup, FormControl, Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";
import { FullListOfPlaylists, Playlists } from "./../spotifyApi/requests/playlists.js"
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class PlaylistListContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            playlists: [],
            isChildVisible: false
        }
    }

    componentDidMount() {
        FullListOfPlaylists.getFullListOfUsersPlaylists()
            .then((resp) => {
                console.log(resp);
                this.setState({ playlists: resp });
            });
    }

    toggleChildVisibility() {
        this.setState({ isChildVisible: !this.state.isChildVisible });
    }

    goToPlaylist(id) {
        this.props.history.push(`/playlist#id=${id}`)
    }

    render() {
        return (
            <PlaylistList
                toggleChildVisibility={() => { this.toggleChildVisibility() }}
                isChildVisible={this.state.isChildVisible}
                playlists={this.state.playlists}
                onClick={(id) => { this.goToPlaylist(id) }}
                onSuccess={(id) => { this.goToPlaylist(id) }}
            />
        );
    }
}

const PlaylistList = (props) =>
    <ListGroup>
        <ListGroupItem onClick={() => props.toggleChildVisibility()}>
            <Glyphicon glyph="plus" /> Create New Playlist
            <div>
                <NewPlaylistModalContainer
                    isVisible={props.isChildVisible}
                    onSuccess={props.onSuccess}
                />
            </div>
        </ListGroupItem>
        {props.playlists.map((playlist) => {
            return <ListGroupItem
                key={playlist.id}
                onClick={() => props.onClick(playlist.id)}
            >
                {playlist.name}
            </ListGroupItem>;
        })}
    </ListGroup>

PlaylistList.propTypes = {
    isChildVisible: PropTypes.bool,
    onClick: PropTypes.func,
    onSuccess: PropTypes.func
}

class NewPlaylistModalContainer extends React.Component {
    constructor(props) {
        super();

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
            <NewPlaylistModal
                onNameChange={(name) => { this.setState({ name }) }}
                onDescriptionChange={(description) => { this.setState({ description }) }}
                onSuccessClick={() => { this.onSuccessClick() }}
                isVisible={this.state.isVisible}
            />
        )
    }
}

NewPlaylistModalContainer.propTypes = {
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
    isVisible: PropTypes.bool,
}

class NewPlaylistModal extends React.Component {
    visible() {
        return (
            <form onClick={(e) => {
                e.stopPropagation();
            }}>
                <hr />
                <FormGroup controlId="name" bsSize="small">
                    <InputGroup>
                        <InputGroup.Addon>Name</InputGroup.Addon>
                        <FormControl
                            onChange={(e) => this.props.onNameChange(e.target.value)}
                            type="text"
                        />
                    </InputGroup>
                </FormGroup>

                <FormGroup controlId="description">
                    <InputGroup>
                        <InputGroup.Addon>Description</InputGroup.Addon>
                        <FormControl
                            componentClass="textarea"
                            placeholder="textarea"
                            onChange={(e) => this.props.onDescriptionChange(e.target.value)}
                        />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <Button
                        bsStyle="success"
                        onClick={() => this.props.onSuccessClick()}
                        block
                    >
                        <Glyphicon glyph="plus" /> Create Playlist
                    </Button>
                </FormGroup>
            </form >
        );
    }

    notVisible() {
        console.log("not visible");
        return ("");
    }

    render() {
        return (
            this.props.isVisible ? this.visible() : this.notVisible()
        );
    }
}

NewPlaylistModal.propTypes = {
    onNameChange: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    onSuccessClick: PropTypes.func,
    isVisible: PropTypes.bool
}

export default withRouter(PlaylistListContainer);