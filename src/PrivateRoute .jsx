import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthToken } from "./config/localStore";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      getAuthToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);
