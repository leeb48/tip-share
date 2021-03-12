import Admin from "components/admin/Admin";
import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import Profile from "components/profile/Profile";
import ProfileAccountEdit from "components/profile/ProfileAccountEdit";
import TipPostForm from "components/tip-posts/TipPostForm";
import TipPostMain from "components/tip-posts/TipPostMain";
import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchResults from "./components/search/SearchResults";
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
        <Route exact path="/tip-post/new" component={TipPostForm} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile-edit" component={ProfileAccountEdit} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </div>
  );
};

export default Routes;
