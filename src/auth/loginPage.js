import React from "react";
import ImplicitGrant from "./implicitGrant.js";
import { Grid, Button, PageHeader } from "react-bootstrap";

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

export default LoginPageContainer