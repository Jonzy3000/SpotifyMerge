import React from "react";
import UserProfile from "./../spotifyApi/requests/userProfile.js"
import Utils from "./../spotifyApi/utils.js"
import { Grid, PageHeader } from "react-bootstrap";
import PlaylistsContainer from "./containers/playlistsContainer";
import * as userActions from "../redux/actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
             <PageHeader>Hello, {props.userId}  </PageHeader>
            <PlaylistsContainer />
        </Grid>
    );
}

Home.propTypes = {
    userId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);;
