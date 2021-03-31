import { CircularProgress } from "@material-ui/core";
import { RootState } from "app/rootReducer";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated, authLoading } = useSelector((state: RootState) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      authLoading: state.auth.authLoading,
    };
  }, shallowEqual);

  // state used to give the component some time to retrieve
  // user auth data. (needed when navigating using url)
  const [routeLoading, setRouteLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      setRouteLoading(false);
    }
  }, [authLoading]);

  const renderRedirect = isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );

  if (routeLoading) {
    return <CircularProgress />;
  } else {
    return renderRedirect;
  }
};

export default PrivateRoute;
