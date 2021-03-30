import Admin from "components/admin/Admin";
import LoginForm from "components/auth/LoginForm";
import RegisterForm from "components/auth/RegisterForm";
import Profile from "components/profile/Profile";
import ProfileAccountEdit from "components/profile/ProfileAccountEdit";
import TipPostFormNew from "components/tip-posts/TipPostFormNew";
import TipPostMain from "components/tip-posts/TipPostMain";
import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchResults from "./components/search/SearchResults";
import Landing from "./components/layout/Landing";
import PrivateRoute from "components/auth/PrivateRoute";
import TipPostFormEdit from "components/tip-posts/TipPostFormEdit";

const Routes = () => {
  return (
    <div>
      <Switch>
        {/* Public */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/results" component={SearchResults} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/tip-post" component={TipPostMain} />
        {/* Private */}
        <PrivateRoute exact path="/tip-post/new" component={TipPostFormNew} />
        <PrivateRoute
          exact
          path="/tip-post/edit/:id"
          component={TipPostFormEdit}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/profile-edit"
          component={ProfileAccountEdit}
        />
        <PrivateRoute exact path="/admin" component={Admin} />
      </Switch>
    </div>
  );
};

export default Routes;
