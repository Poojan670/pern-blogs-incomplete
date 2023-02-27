import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import RouteSkeleton from "../Routes/RouteSkeleton";
import Home from "../pages/Home.js";
import Blogs from "../pages/Blogs.js";
import Register from "../pages/Register.js";
import Verify from "../pages/Verify";
import ResetPassword from "../pages/ResetPassword";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";

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
          <Route exact path="/verify" component={Verify} />
          <Route component={PageNotFound} />
          <Route component={Home} />
        </Switch>
      </Suspense>
    </>
  );
};

export default PublicRoutes;
