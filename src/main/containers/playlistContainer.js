import React from "react";
import Utils from "./../../spotifyApi/utils";
import { Playlists, FullListOfTracks } from "../../spotifyApi/requests/playlists";
import Playlist from "../components/playlist";
import SearchContainer from "./searchContainers/searchContainer";

class PlaylistContainer extends React.Component {
    constructor(props) {
        super();

        this.state = {
            playlistId: Utils.getHashParams().id,
            tracks: [],
            name: "",
        }
    }

    componentDidMount() {
        Playlists.getPlaylist(this.state.playlistId)
            .then((resp) => {
                const { name } = resp.data;
                this.setState({ name });
            });

        FullListOfTracks.getPlaylistWithAllTracks(this.state.playlistId)
            .then((tracks) => {
                this.setState({ tracks });
            });
    }

    render() {
        return (
            <React.Fragment>
                <Playlist name={this.state.name} tracks={this.state.tracks} />
                <SearchContainer />
            </React.Fragment>
        );
    }
}

export default PlaylistContainer;
