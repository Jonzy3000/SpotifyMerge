import React from "react";
import ImplicitGrant from "./implicitGrant.js";
import { Grid, Button, PageHeader } from "react-bootstrap";
import PropTypes from "prop-types";

class LoginPageContainer extends React.Component {
    constructor() {
        super();
        this.grant = new ImplicitGrant();
    }

    handleLoginClick() {
        this.grant.login();
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

export default LoginPageContainer