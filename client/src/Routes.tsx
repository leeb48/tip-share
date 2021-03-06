import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchResults from "./features/search/SearchResults";
import Landing from "./layout/Landing";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/results" component={SearchResults} />
      </Switch>
    </div>
  );
};

export default Routes;
