import React from "react";
import ImplicitGrant from "./implicitGrant.js";
import { Grid, Button, PageHeader } from "react-bootstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class LoginPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.grant = new ImplicitGrant();
    }

    handleLoginClick() {
        this.grant.login().then(() => {
            this.props.history.push("/playlists");
        });
    }

    render() {
        return (
            <LoginPage handleLoginClick={() => { this.handleLoginClick() }} />
        );
    }
}

const LoginPage = props =>
    <Grid>
        <div className="login">
            <PageHeader>Login</PageHeader>
            <Button onClick={() => { props.handleLoginClick() }}>Login</Button>
        </div>
    </Grid>

LoginPage.propTypes = {
    handleLoginClick: PropTypes.func.isRequired,
}

export default withRouter(LoginPageContainer);