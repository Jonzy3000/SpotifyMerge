import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/home.js";
import { Provider } from "react-redux"
import store from "./redux/store";
import PlaylistContainer from "./main/containers/playlistContainer";
import NavComponent from "./main/navbar/navbar";
import LoginWindow from "./auth/loginWindow";

/**
 * TODO
 * - NavBar and some navigation (back blah blah)
 * - Requests for recommendation
 *    - type ahead for songs/artists?
 * - Re-login when session has expired and ability to log out
 * - Saving token/saving state on refresh? 
 */

ReactDOM.render(
  (<Provider store={store}>
    <div className="App">
      <Router>
        <div>
          <NavComponent />
          <Switch>
            {/* <Route exact path="/" component={LoginPageContainer} /> */}
            <Route path="/callback" component={LoginWindow} />
            <Route path="/playlist" component={PlaylistContainer} />
            <Route path="/playlists" component={Home} />
          </Switch>
        </div>
      </Router >
    </div>
  </Provider>),
  document.getElementById("index"));

