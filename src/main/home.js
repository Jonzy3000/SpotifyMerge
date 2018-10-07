import React from "react";
import UserProfile from "./../spotifyApi/requests/userProfile.js"
import Utils from "./../spotifyApi/utils.js"
import { FullListOfPlaylists, Playlists } from "./../spotifyApi/requests/playlists.js"
import { Grid, ListGroup, ListGroupItem, PageHeader, Row, Glyphicon } from "react-bootstrap";
import PlaylistLists from "./playlistList.js";

class Home extends React.Component {
    constructor(props) {
        super();

        this.state = {
            oAuthToken: Utils.getHashParams().access_token,
            userId: "",
            playlists: []
        };

        this.playlistRequests = new Playlists(this.state.oAuthToken);
    }

    componentDidMount() {
        new UserProfile().getCurrentUsersProfile(this.state.oAuthToken)
            .then((resp) => {
                this.setState({ userId: resp.data.id });
            });
    }

    render() {
        return (
            <Grid>
                <HomeHeader id={this.state.userId} />
                <PlaylistLists userId={this.state.userId} oAuthToken={this.state.oAuthToken} />
            </Grid>
        );
    }
}

const HomeHeader = (props) => {
    return (
        <PageHeader>Hello, {props.id}  </PageHeader>
    );
}

export default Home;
