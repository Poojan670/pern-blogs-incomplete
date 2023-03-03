import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, roles, location, ...rest }) => {
  // props
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {roles.length > 0 && roles.includes(role) ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}
    </>
  );
};

export default React.memo(ProtectedRoute);
