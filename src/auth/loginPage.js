import React from "react";
import ImplicitGrant from "./implicitGrant.js";
import {Grid, Button, PageHeader} from "react-bootstrap";

class LoginPage extends React.Component {
    constructor(props) {
        super();
        this.grant = new ImplicitGrant();
    }

    handleLoginClick() {
        this.grant.login();
    }

    render() {
        return (
            <Grid>
                <div className="login">
                    <PageHeader>Login</PageHeader>
                    <Button onClick={() => {this.handleLoginClick()}}>Login</Button>
                </div>
            </Grid>
        );
    }
}

export default LoginPage