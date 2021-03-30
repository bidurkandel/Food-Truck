import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component}, ...rest) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem("Token") ? <Component /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
