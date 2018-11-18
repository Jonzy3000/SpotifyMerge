import React from "react";
import Utils from "./../../spotifyApi/utils";
import { Playlists, FullListOfTracks } from "../../spotifyApi/requests/playlists";
import { PlaylistWithStyles, PlaylistTitle } from "../components/playlist";
import SearchContainer from "./searchContainers/searchContainer";
import "../../css/main.css"
import { connect } from "react-redux";
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"

class PlaylistContainer extends React.Component {
    constructor(props) {
        super();

        this.state = {
            playlistId: Utils.getHashParams().id,
            tracks: [],
            name: "",
        }
    }

    fetchDataAndUpdate() {
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

    componentDidMount() {
        this.fetchDataAndUpdate();
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.fetchDataAndUpdate();
        }
    }

    render() {
        return (
            <div className="container">
                <PlaylistTitle name={this.state.name} />
                <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                >
                    <AddIcon />
                    Add Songs
                </Button>
                <SearchContainer />
                <PlaylistWithStyles name={this.state.name} tracks={this.state.tracks} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.users.userId
    }
}

export default connect(mapStateToProps)(PlaylistContainer);
