import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "App";
import registerServiceWorker from "services/registerServiceWorker";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
// registerServiceWorker();

//webpack hot reloading
if (module.hot) {
  module.hot.accept();
}
