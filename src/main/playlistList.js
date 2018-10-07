import React from "react";
import { FormGroup, Button, InputGroup, Checkbox, FormControl, ControlLabel, Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";
import { FullListOfPlaylists, Playlists } from "./../spotifyApi/requests/playlists.js"

class PlaylistList extends React.Component {
    constructor(props) {
        super();

        this.state = {
            playlists: [],
            oAuthToken: props.oAuthToken,
            userId: props.userId,
            isChildVisible: false
        }
    }

    componentDidMount() {
        new FullListOfPlaylists(this.state.oAuthToken).getFullListOfUsersPlaylists()
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
            isVisible: props.isVisible
        };

        //this.playlistsRequests won't be made yet
    }

    componentWillReceiveProps(props) {
        this.setState({ isVisible: props.isVisible })
    }

    createPlaylist(name, isPublic, description) {
        this.playlistRequests.createPlaylist(this.state.userId, {
            name: name,
            public: isPublic,
            description: description

        }).then((resp) => { console.log(resp); });
    }

    visible() {
        return (
            <form>
                <FormGroup controlId="name" bSize="small">
                    <InputGroup>
                        <InputGroup.Addon>Name</InputGroup.Addon>
                        <FormControl type="text" />
                    </InputGroup>
                </FormGroup>

                <Checkbox>
                    Public
                </Checkbox>

                <FormGroup controlId="formControlsTextarea">
                    <InputGroup>
                        <InputGroup.Addon>Description</InputGroup.Addon>
                        <FormControl componentClass="textarea" placeholder="textarea" />
                    </InputGroup>
                </FormGroup>


                <Button type="submit"><Glyphicon glyph="plus" /> Create</Button>
            </form>
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