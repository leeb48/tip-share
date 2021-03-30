import { RootState } from "app/rootReducer";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }, shallowEqual);

  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
