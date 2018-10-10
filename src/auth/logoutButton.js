import React from 'react'
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as userActions from "../redux/actions/user";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch(
            userActions.logOut()
        ),
    };
}

class LogoutButtonContainer extends React.Component {
    onLogOut() {
        this.props.logOut();
        localStorage.clear();
        //TODO go back to home
    }


    render() {
        return (
            <React.Fragment>
                <LogoutButton onLogOut={() => { this.onLogOut(); }} />
            </React.Fragment>
        )
    }
}


const LogoutButton = props => {
    return (
        <React.Fragment>
            <Button onClick={() => {
                props.onLogOut();
            }}>Logout</Button>
        </React.Fragment>
    )
}

export default connect(null, mapDispatchToProps)(withRouter(LogoutButtonContainer));
