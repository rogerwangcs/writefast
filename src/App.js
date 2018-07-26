import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "App.css";
import NavBar from "components/Nav/NavBar.js";
import Home from "screens/Home";
import Editor from "screens/Editor";
import ErrorPage from "screens/ErrorPage.js";

import Header from "components/generic/Header";
import Options from "components/Home/Options";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pace: "normal",
      length: "full"
    };
  }

  setPace = pace => {
    this.setState({ pace: pace });
  };

  setLength = length => {
    this.setState({ length: length });
  };

  render() {
    return (
      <div className="App">
        <Header large={window.location.pathname === "/"}>
          <h1>Write Fast</h1>
        </Header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                pace={this.state.pace}
                length={this.state.length}
                setPace={this.setPace}
                setLength={this.setLength}
              />
            )}
          />
          <Route
            exact
            path="/write"
            render={() => (
              <Editor
                pace={this.state.pace}
                length={this.state.length}
                setPace={this.setPace}
                setLength={this.setLength}
              />
            )}
          />
          <Route exact path="/404" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
