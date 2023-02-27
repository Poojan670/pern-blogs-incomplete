import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({
  component: Component,
  permission,
  location,
  ...rest
}) => {
  // props
  const permissions = useSelector((state) => state.auth.permissions);
  const is_superuser = useSelector((state) => state.auth.is_superuser);

  return (
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     return user_permissions?.includes(props?.permission) ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    //     );
    //   }}
    // />
    <>
      {permission === "" ||
      is_superuser ||
      permissions?.some((element) => permission.indexOf(element) !== -1) ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}
    </>
  );
};

export default React.memo(ProtectedRoute);
