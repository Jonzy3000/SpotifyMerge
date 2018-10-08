import React from "react";
import ReactDOM from "react-dom";
import LoginPageContainer from "./auth/loginPage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/home.js";
import { Provider } from "react-redux"
import store from "./redux/store";

ReactDOM.render(
  (<Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPageContainer} />
        <Route path="/callback" component={Home} />
      </Switch>
    </Router >
  </Provider>),
  document.getElementById("index"));
