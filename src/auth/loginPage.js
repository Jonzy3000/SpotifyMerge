import React from "react";
import ReactDOM from "react-dom";
import ImplicitGrant from "./implicitGrant.js";

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
            <div className="login">
                <h1>Login</h1>
                <button onClick={() => {this.handleLoginClick()}}>Login</button>
            </div>
        );
    }
}

export default LoginPage