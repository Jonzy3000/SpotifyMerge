import React from "react";
import UserProfile from "./../spotifyApi/requests/userProfile.js"
import Utils from "./../spotifyApi/utils.js"
import { Grid, PageHeader } from "react-bootstrap";
import PlaylistListContainer from "./playlistList.js";
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

const mapStateToProps = state => {
    return {
        userId: state.users.userId
    }
}

class HomeContainer extends React.Component {
    constructor(props) {
        super();

        props.updateOAuth(Utils.getHashParams().access_token);
    }

    componentDidMount() {
        UserProfile.getCurrentUsersProfile()
            .then((resp) => {
                this.props.updateUserId(resp.data.id);
            });
    }

    render() {
        return (<Home userId={this.props.userId} />);
    }
}

const Home = (props) => {
    return (
        <Grid>
            <HomeHeader id={props.userId} />
            <PlaylistListContainer />
        </Grid>
    );
}

const HomeHeader = (props) => {
    return (
        <PageHeader>Hello, {props.id}  </PageHeader>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);;
