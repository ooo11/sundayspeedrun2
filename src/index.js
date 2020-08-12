import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { StoreProvider } from "easy-peasy";
import App from "./components/app/App.jsx";
import { store } from "./components/store/index";

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById("root")
);
