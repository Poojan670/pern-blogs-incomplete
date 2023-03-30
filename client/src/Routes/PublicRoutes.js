import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import RouteSkeleton from "../Routes/RouteSkeleton";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import BlogDetails from "../pages/Blogs";

const PublicRoutes = ({ theme }) => {
  return (
    <>
      <Suspense fallback={<RouteSkeleton />}>
        <Switch>
          <Route exact path="/">
            <Home theme={theme} />
          </Route>
          <Route exact path="/login">
            <Login theme={theme} />
          </Route>
          <Route exact path="/posts" component={Blogs} />
          <Route exact path="/register">
            <Register theme={theme} />
          </Route>
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/forgot-password">
            <ForgotPassword theme={theme} />
          </Route>
          <Route exact path="/verify" component={Verify} />
          <Route exact path="/blog-details/:id/:categoryId">
            <BlogDetails theme={theme} />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default PublicRoutes;
