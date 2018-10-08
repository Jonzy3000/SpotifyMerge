import React from "react";
import { FormGroup, Button, InputGroup, FormControl, Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";
import { FullListOfPlaylists, Playlists } from "./../spotifyApi/requests/playlists.js"

class PlaylistList extends React.Component {
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

    render() {
        return (
            <ListGroup>
                <ListGroupItem onClick={() => this.toggleChildVisibility()}>
                    <Glyphicon glyph="plus" /> Create New Playlist
                    <div>
                        <NewPlaylistModal isVisible={this.state.isChildVisible} />
                    </div>
                </ListGroupItem>
                {this.state.playlists.map((playlist) => {
                    return <ListGroupItem key={playlist.id} onClick={() => { }}>{playlist.name}</ListGroupItem>;
                })}
            </ListGroup>
        );
    }
}

class NewPlaylistModal extends React.Component {
    constructor(props) {
        super();

        this.state = {
            onSuccess: props.onSuccess,
            onFail: props.onFail,
            isVisible: props.isVisible,
            name: "",
            description: "",
        };

        //this.playlistsRequests won't be made yet
    }

    componentWillReceiveProps(props) {
        this.setState({ isVisible: props.isVisible })
    }

    createPlaylist() {
        const { description, name } = this.state;
        Playlists.createPlaylist({
            name: name,
            description: description

        }).then((resp) => { console.log(resp); });
    }

    onSuccessClick() {
        this.createPlaylist();
    }

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
                            onChange={(e) => this.setState({ name: e.target.value })}
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
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <Button
                        bsStyle="success"
                        onClick={() => this.onSuccessClick()}
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
        return this.state.isVisible ? this.visible() : this.notVisible();
    }
}

export default PlaylistList;