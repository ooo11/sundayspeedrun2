import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "../main/Dashboard";
import Login from "../main/Login";
import Signup from "../main/Signup";

function Router() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default Router;
