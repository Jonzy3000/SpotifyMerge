import React from "react";
import UserProfile from "./../spotifyApi/requests/userProfile.js"
import Utils from "./../spotifyApi/utils.js"
import {FullListOfPlaylists} from "./../spotifyApi/requests/playlists.js"
import {Well} from "react-bootstrap";

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
            <div>
                <div>
                    Hello {this.state.userId} <br/> 
                    Logged In!
                </div>
                <div>
                    {this.state.playlists.map((playlist) => {
                        return <Well>{playlist.name}</Well>;
                    })}
                </div>
            </div>
        );
    }
}

export default Home;
