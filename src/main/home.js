import React from "react";

import PlaylistsContainer from "./containers/playlistsContainer";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        userId: state.users.userId
    }
}

class HomeContainer extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (<Home userId={this.props.userId} />);
    }
}

const Home = (props) => {
    return (
        <React.Fragment>
            <h1>Hello, {props.userId}</h1>
            <PlaylistsContainer />
        </React.Fragment>
        // <Grid>
        //      <PageHeader>Hello, {props.userId}  </PageHeader>
        //     <PlaylistsContainer />
        // </Grid>
    );
}

Home.propTypes = {
    userId: PropTypes.string,
}

export default connect(mapStateToProps)(HomeContainer);
