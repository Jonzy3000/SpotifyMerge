import React from "react";
import ImplicitGrant from "./implicitGrant.js";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import UserProfile from "../spotifyApi/requests/userProfile.js";
import * as userActions from "../redux/actions/user";
import Button from '@material-ui/core/Button';

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

class LoginButtonContainer extends React.Component {
    constructor(props) {
        super(props);
        this.grant = new ImplicitGrant();
    }

    handleLoginClick() {
        this.grant.login().then(() => {
            if (this.props.shouldRedirect) {
                this.props.history.push("/playlists");
            }

            UserProfile.getCurrentUsersProfile()
                .then((resp) => {
                    this.props.updateUserId(resp.data.id);
                });
        });
    }

    render() {
        return (
            <LoginButton handleLoginClick={() => { this.handleLoginClick() }} />
        );
    }
}

const LoginButton = props =>
    <React.Fragment>
        <Button color="inherit" onClick={() => { props.handleLoginClick() }}>Login Yo</Button>
    </React.Fragment>

LoginButtonContainer.propTypes = {
    shouldRedirect: PropTypes.bool.isRequired
}

LoginButton.propTypes = {
    handleLoginClick: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(withRouter(LoginButtonContainer));