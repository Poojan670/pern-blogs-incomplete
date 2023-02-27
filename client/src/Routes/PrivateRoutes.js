import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./ProtectedRoute";

//for refreshing the page when lazy fails loading the component
const lazyWithReload = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem("page-has-been-force-refreshed") || "false"
    );
    try {
      const component = await componentImport();
      window.localStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem("page-has-been-force-refreshed", "true");
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      throw error;
    }
  });
const Dashboard = lazyWithReload(() => import("../pages/DashBoard"));
const PageNotFound = lazyWithReload(() => import("../pages/PageNotFound"));
const Home = lazyWithReload(() => import("../pages/Home"));
const Posts = lazyWithReload(() => import("../pages/Blogs"));

const PrivateRoutes = () => {
  const ErrorFallback = ({ error }) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  };
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={""}>
          <Switch>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
              permission=""
            />
            <ProtectedRoute exact path="/" component={Home} permission="" />
            <ProtectedRoute
              exact
              path="/posts"
              component={Posts}
              permission=""
            />
            <Route component={PageNotFound} permission="" />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivateRoutes;
