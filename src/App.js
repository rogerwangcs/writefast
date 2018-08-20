import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LocalStorageHandler from "services/LocalStorageHandler";

import "semantic-ui-css/semantic.min.css";
import "App.css";
import Home from "screens/Home";
import Editor from "screens/Editor";
import Manager from "screens/Manager";

import Header from "components/generic/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pace: "normal",
      length: "full",
      isMobile: this.isMobileDevice()
    };

    LocalStorageHandler.initializeStorage();
  }

  isMobileDevice = () => {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  };

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

  deletePage = pageID => {
    console.log(pageID);
    LocalStorageHandler.deletePage(pageID);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        {/* where notification toasts will display. */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange={false}
          draggable
          pauseOnHover={false}
        />
        {/* for browserRouter, this needs to be window.location.pathname */}
        <Header large={window.location.hash === "#/"}>
          <h1>Write Fast</h1>
        </Header>
        {!this.state.isMobile ? (
          <Switch>
            <Route
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
              render={() => (
                <Manager
                  getPages={this.getPages}
                  deletePage={this.deletePage}
                />
              )}
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
          </Switch>
        ) : (
          <p>Write Fast does not currently support mobile browsers yet.</p>
        )}
      </div>
    );
  }
}

export default App;
