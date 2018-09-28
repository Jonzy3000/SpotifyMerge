import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./auth/loginPage.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./main/home.js";

ReactDOM.render(
  (<Router>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/callback" component={Home} />
    </Switch>
  </Router >),
  document.getElementById("index"));
