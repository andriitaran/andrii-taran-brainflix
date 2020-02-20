import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Upload from "./components/Upload";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/videos/:id" component={App} />
      <Route path="/upload" component={Upload} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
