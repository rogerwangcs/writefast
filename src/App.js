import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "App.css";
import NavBar from "components/Nav/NavBar.js";
import Home from "screens/Home";
import Editor from "screens/Editor"
import ErrorPage from "screens/ErrorPage.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div
          className="nav-placeholder"
          style={{
            height: "56px"
          }}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/write" component={Editor} />
          <Route exact path="/404" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
