import React from "react";
import { Switch, Route } from "react-router-dom";

import Account from "./Account";
import AccountEntry from "./AccountEntry";
import Explore from "./Explore";
import Home from "./Home";
import Recommended from "./Recommended";
import Rate from "./Rate";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/account-entry" component={AccountEntry} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/explore" component={Explore} />
      <Route exact path="/" component={Home} />
      <Route exact path="/recommended" component={Recommended} />
      <Route exact path="/search-result" component={Rate} />
    </Switch>
  );
};

export default Main;
