import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./auth/loginPage.js";

const Index = () => {
  return <LoginPage />
};

ReactDOM.render( < Index /> , document.getElementById("index"));