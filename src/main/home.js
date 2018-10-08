import React from "react";
import UserProfile from "./../spotifyApi/requests/userProfile.js"
import Utils from "./../spotifyApi/utils.js"
import { Grid, PageHeader } from "react-bootstrap";
import PlaylistLists from "./playlistList.js";
import * as userActions from "../redux/actions/user";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        updateOAuth: oAuthToken => dispatch(
            userActions.updateOAuthToken(oAuthToken)
        ),
        updateUserId: id => dispatch(
            userActions.updateUserId(id)
        )
    };
}

class ConnectedHome extends React.Component {
    constructor(props) {
        super();

        this.state = {
            oAuthToken: Utils.getHashParams().access_token,
            userId: "",
            playlists: []
        };

        props.updateOAuth(Utils.getHashParams().access_token);
    }

    componentDidMount() {
        UserProfile.getCurrentUsersProfile()
            .then((resp) => {
                this.setState({ userId: resp.data.id });
                this.props.updateUserId(resp.data.id);
            });
    }

    render() {
        return (
            <Grid>
                <HomeHeader id={this.state.userId} />
                <PlaylistLists />
            </Grid>
        );
    }
}

const HomeHeader = (props) => {
    return (
        <PageHeader>Hello, {props.id}  </PageHeader>
    );
}

const Home = connect(null, mapDispatchToProps)(ConnectedHome);
export default Home;
