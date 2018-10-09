import React from "react";
import Utils from "./../spotifyApi/utils";
import { Playlists, FullListOfTracks } from "../spotifyApi/requests/playlists";
import PropTypes from "prop-types";

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
            <Playlist name={this.state.name} tracks={this.state.tracks} />
        );
    }
}

const Playlist = props =>
    <div>
        <h1> Hello World {props.name}</h1>
        <br />
        {props.tracks.map((track) => {
            return <h6 key={track.track.id}>{track.track.name}</h6>
        })}
    </div>

Playlist.propTypes = {
    name: PropTypes.string,
    tracks: PropTypes.shape({
        track: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artists: PropTypes.arrayOf(PropTypes.string),
        })
    })
}

export default PlaylistContainer;