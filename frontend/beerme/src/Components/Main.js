import React from "react";
import { Switch, Route } from "react-router-dom";

import Explore from "./Explore";
import AccountEntry from "./AccountEntry";
import Home from "./Home";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/explore" component={Explore} />
      <Route exact path="/account-entry" component={AccountEntry} />
    </Switch>
  );
};

export default Main;
