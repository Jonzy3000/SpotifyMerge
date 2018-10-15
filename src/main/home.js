import React from "react";

import PlaylistsContainer from "./containers/playlistsContainer";



const Home = (props) => {
    return (
        <React.Fragment>
            <PlaylistsContainer />
        </React.Fragment>
        // <Grid>
        //      <PageHeader>Hello, {props.userId}  </PageHeader>
        //     <PlaylistsContainer />
        // </Grid>
    );
}

export default (Home);
