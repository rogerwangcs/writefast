import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LocalStorageHandler from "services/LocalStorageHandler";

import "semantic-ui-css/semantic.min.css";
import "App.css";
import NavBar from "components/Nav/NavBar.js";
import Home from "screens/Home";
import Editor from "screens/Editor";
import Manager from "screens/Manager";
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

    LocalStorageHandler.initializeStorage();
  }

  setPace = newPace => {
    this.setState({ pace: newPace });
  };

  setLength = newLength => {
    this.setState({ length: newLength });
  };

  getPages = () => {
    console.log(LocalStorageHandler.getPages());
    return LocalStorageHandler.getPages();
  };

  addPage = newPage => {
    LocalStorageHandler.storePage(newPage);
  };

  render() {
    return (
      <div className="App">
        {/* for browserRouter, this needs to be window.location.pathname */}
        <Header large={window.location.hash === "#/"}>
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
                addPage={this.addPage}
              />
            )}
          />
          <Route
            exact
            path="/pages"
            render={() => <Manager getPages={this.getPages} />}
          />
          <Route
            path="/*"
            render={() => (
              <Redirect
                to={{
                  pathname: "/"
                }}
              />
            )}
          />
          {/* <Route exact path="/404" component={ErrorPage} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
