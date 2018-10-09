import React from "react";
import ReactDOM from "react-dom";
import LoginPageContainer from "./auth/loginPage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/home.js";
import { Provider } from "react-redux"
import store from "./redux/store";
import PlaylistContainer from "./main/playlist";


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
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPageContainer} />
        <Route path="/callback" component={Home} />
        <Route path="/playlist" component={PlaylistContainer} />
      </Switch>
    </Router >
  </Provider>),
  document.getElementById("index"));
