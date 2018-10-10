import React from "react";

import { Grid, PageHeader } from "react-bootstrap";
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
        <Grid>
             <PageHeader>Hello, {props.userId}  </PageHeader>
            <PlaylistsContainer />
        </Grid>
    );
}

Home.propTypes = {
    userId: PropTypes.string,
}

export default connect(mapStateToProps)(HomeContainer);
