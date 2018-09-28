import React from "react";
import UserProfile from "./../spotifyApi/requests/userProfile.js"
import Utils from "./../spotifyApi/utils.js"
import {FullListOfPlaylists} from "./../spotifyApi/requests/playlists.js"
import {Grid, ListGroup, ListGroupItem, PageHeader, Row, Glyphicon} from "react-bootstrap";

class Home extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            oAuthToken: Utils.getHashParams().access_token,
            userId: "",
            playlists: []
        };
    }

    componentDidMount() {
        new UserProfile().getCurrentUsersProfile(this.state.oAuthToken)
            .then((resp) => {
                this.setState({userId: resp.data.id});
            });
        
            new FullListOfPlaylists(this.state.oAuthToken).getFullListOfUsersPlaylists()
            .then((resp) => {
                console.log(resp);
                this.setState({playlists: resp});
            });
    }

    render() {
        return (
            <Grid>
                <PageHeader>Hello, {this.state.userId}  </PageHeader>
                    <ListGroup>
                        <ListGroupItem>
                            <Glyphicon glyph="plus" /> Create New Playlist
                        </ListGroupItem>
                        {this.state.playlists.map((playlist) => {
                            return <ListGroupItem key={playlist.id} onClick={()=>{}}>{playlist.name}</ListGroupItem>;
                        })}
                    </ListGroup>
            </Grid>
        );
    }
}

export default Home;
