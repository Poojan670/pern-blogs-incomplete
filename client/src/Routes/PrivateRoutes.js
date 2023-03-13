import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./ProtectedRoute";
import BlogList from "../pages/BlogList";
import BlogsTable from "../pages/BlogsList";

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
const Home = lazyWithReload(() => import("../pages/Home"));
const Posts = lazyWithReload(() => import("../pages/Blogs"));
const PageNotFound = lazyWithReload(() => import("../pages/PageNotFound"));
const UserList = lazyWithReload(() => import("../pages/UserList"));
const Bloglist = lazyWithReload(() => import("../pages/BlogList"));
const BlogsList = lazyWithReload(() => import("../pages/BlogsList"));
const Category = lazyWithReload(() => import("../pages/Category"));

const PrivateRoutes = ({ isOpen, setIsOpen }) => {
  const ErrorFallback = ({ error }) => {
    return (
      <div roles="alert">
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
            // Dashboard
            <ProtectedRoute
              exact
              path="/dashboard"
              roles={["ADMIN", "USER", "MOD"]}
            >
              <Dashboard isOpen={isOpen} setIsOpen={setIsOpen} />
            </ProtectedRoute>
            // Blogs list
            <ProtectedRoute
              exact
              path="/blogs-lists"
              component={Bloglist}
              roles={["ADMIN", "MOD"]}
            />
            // Blogs List
            <ProtectedRoute exact path="/blogs-list" roles={["ADMIN", "MOD"]}>
              <BlogsList isOpen={isOpen} setIsOpen={setIsOpen} />
            </ProtectedRoute>
            // User List
            <ProtectedRoute exact path="/users" roles={["ADMIN"]}>
              <UserList isOpen={isOpen} setIsOpen={setIsOpen} />
            </ProtectedRoute>
            // Category List
            <ProtectedRoute exact path="/blogs-category" roles={["ADMIN"]}>
              <Category isOpen={isOpen} setIsOpen={setIsOpen} />
            </ProtectedRoute>
            // Home
            <ProtectedRoute
              exact
              path="/"
              component={Home}
              roles={["ADMIN", "USER", "MOD"]}
            />
            // Posts
            <ProtectedRoute exact path="/posts" component={Posts} roles={[]} />
            <Route component={PageNotFound} roles={[]} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivateRoutes;
