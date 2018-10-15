import React from "react";
import Utils from "./../../spotifyApi/utils";
import { Playlists, FullListOfTracks } from "../../spotifyApi/requests/playlists";
import { PlaylistWithStyles, PlaylistTitle } from "../components/playlist";
import SearchContainer from "./searchContainers/searchContainer";
import "../../css/main.css"

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
            <div className="container">
                <PlaylistTitle name={this.state.name} />
                <SearchContainer />
                <PlaylistWithStyles name={this.state.name} tracks={this.state.tracks} />
            </div>
        );
    }
}

export default PlaylistContainer;
