import LoginForm from "features/auth/LoginForm";
import RegisterForm from "features/auth/RegisterForm";
import TipPost from "features/tip-posts/TipPost";
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
        <Route exact path="/tip-post" component={TipPost} />
      </Switch>
    </div>
  );
};

export default Routes;
