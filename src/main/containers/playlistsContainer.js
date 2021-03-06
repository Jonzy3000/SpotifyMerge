import React from "react";
import { FullListOfPlaylists } from "./../../spotifyApi/requests/playlists.js"
import Playlists from "../components/playlists";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../css/main.css"
import Typography from "@material-ui/core/Typography";
import NewPlaylistDialogContainer from "./newPlaylistDialogContainer"

class PlaylistsContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            playlists: [],
            isChildVisible: false
        }
    }

    fetchPlaylistData() {
        FullListOfPlaylists.getFullListOfUsersPlaylists()
            .then((resp) => {
                console.log(resp);
                this.setState({ playlists: resp });
            });
    }

    componentDidMount() {
        this.fetchPlaylistData();
    }

    // TODO don't this this is correct lifecycle method
    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.fetchPlaylistData();
        }
    }

    toggleChildVisibility() {
        this.setState({ isChildVisible: !this.state.isChildVisible });
    }

    goToPlaylist(id) {
        this.props.history.push(`/playlist#id=${id}`)
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 25 }}>
                <Typography color="textSecondary" variant="h3" gutterBottom>
                    Hello, {this.props.userId}
                </Typography>
                <NewPlaylistDialogContainer
                    onSuccess={(id) => { this.goToPlaylist(id) }}
                />
                <Typography color="textSecondary" variant="h5" gutterBottom>
                    Your Playlists:
                </Typography>
                <Playlists
                    toggleChildVisibility={() => { this.toggleChildVisibility() }}
                    isChildVisible={this.state.isChildVisible}
                    playlists={this.state.playlists}
                    onClick={(id) => { this.goToPlaylist(id) }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.users.userId
    }
}

export default connect(mapStateToProps)(withRouter(PlaylistsContainer));
