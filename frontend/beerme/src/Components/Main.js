import React from "react";
import { Switch, Route } from "react-router-dom";

import AccountEntry from "./AccountEntry";
import Explore from "./Explore";
import Home from "./Home";
import Recommended from "./Recommended";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/account-entry" component={AccountEntry} />
      <Route exact path="/explore" component={Explore} />
      <Route exact path="/" component={Home} />
      <Route exact path="/recommended" component={Recommended} />
    </Switch>
  );
};

export default Main;
