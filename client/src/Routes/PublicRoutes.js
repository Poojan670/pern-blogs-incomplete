import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import RouteSkeleton from "../Routes/RouteSkeleton";
import Home from "../pages/Home.js"
import Blogs from "../pages/Blogs.js"
import Register from "../pages/Register.js"
import ResetPassword from "../pages/ResetPassword/ResetPassword"
import ResetPasswordConfirm from "../pages/ResetPassword/ResetPasswordConfirm"
import PageNotFound from "../pages/PageNotFound/PageNotFound"
import Login from "../pages/Login/Login"

const PublicRoutes = () => {
  return (
    <>
      <Suspense fallback={<RouteSkeleton />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts" component={Blogs} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route
            exact
            path="/reset-password/confirm/:token"
            component={ResetPasswordConfirm}
          />
          <Route component={PageNotFound} />
          <Route component={Home} />
        </Switch>
      </Suspense>
    </>
  );
};

export default PublicRoutes;
