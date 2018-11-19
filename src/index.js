import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/home.js";
import { Provider } from "react-redux"
import store from "./redux/store";
import PlaylistContainer from "./main/containers/playlistContainer";
import NavComponent from "./main/navbar/navbar";
import LoginWindow from "./auth/loginWindow";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import PlaylistsContainer from "./main/containers/playlistsContainer";
import SongGenerationContainer from "./main/containers/songGenerationContainer";

/**
 * TODO
 * - Ui to create new playlist
 * - UI to add songs to playlist
 *      - need to add all options?
 *      - set number of songs?
 *      - remove duplicates             
 * - ui to add and delete songs from playlist
 * 
 * 
 * - NavBar and some navigation (back blah blah)
 * - Requests for recommendation
 *    - type ahead for songs/artists?
 * - Re-login when session has expired and ability to log out
 * - Saving token/saving state on refresh? 
 */

// https://material-ui.com/style/typography/#migration-to-typography-v2
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: purple,
        secondary: {
            main: '#f44336',
        },
    }
});

ReactDOM.render(
    (<Provider store={store}>
        <div className="App">
            <CssBaseline />
            <Router>
                <div>
                    <MuiThemeProvider theme={theme}>
                        <NavComponent />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/callback" component={LoginWindow} />
                            <Route path="/playlist" component={PlaylistContainer} />
                            <Route path="/playlists" component={PlaylistsContainer} />
                            <Route path="/song_generation" component={SongGenerationContainer} />
                        </Switch>
                    </MuiThemeProvider>
                </div>
            </Router >
        </div>
    </Provider>),
    document.getElementById("index"));

