import React, { Component } from 'react'
import { connect } from "react-redux";
import LoginButtonContainer from "./loginButton";
import LogoutButton from "./logoutButton"

const mapStateToProps = ({ users }) => {
    return {
        userId: users.userId,
        oAuthToken: users.oAuthToken,
    }
}

class LoginComponentContainer extends Component {
    isLoggedIn() {
        return this.props.oAuthToken != null;
    }

    render() {
        return (
            <div>
                <LoginComponent isLoggedIn={this.isLoggedIn()} />
            </div>
        )
    }
}

const LoginComponent = (props) => {
    return (
        <div>
            {props.isLoggedIn ?
                <LogoutButton />
                :
                <LoginButtonContainer shouldRedirect={true} />}
        </div>
    )
}

export default connect(mapStateToProps)(LoginComponentContainer);


