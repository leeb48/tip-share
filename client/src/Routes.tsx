import LoginForm from "features/auth/LoginForm";
import RegisterForm from "features/auth/RegisterForm";
import TipPostMain from "features/tip-posts/TipPostMain";
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
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/tip-post" component={TipPostMain} />
      </Switch>
    </div>
  );
};

export default Routes;
