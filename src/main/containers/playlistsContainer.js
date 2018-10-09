import React from "react";
import { FullListOfPlaylists } from "./../../spotifyApi/requests/playlists.js"
import Playlists from "../components/playlists";
import { withRouter } from "react-router-dom";

class PlaylistsContainer extends React.Component {
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
            <Playlists
                toggleChildVisibility={() => { this.toggleChildVisibility() }}
                isChildVisible={this.state.isChildVisible}
                playlists={this.state.playlists}
                onClick={(id) => { this.goToPlaylist(id) }}
                onSuccess={(id) => { this.goToPlaylist(id) }}
            />
        );
    }
}

export default withRouter(PlaylistsContainer);
