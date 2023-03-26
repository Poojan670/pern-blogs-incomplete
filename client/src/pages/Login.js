import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { login } from "../Redux/Auth/thunk";
import { authConstants } from "../Redux/Auth/constants";
import Footer from "../components/sub-components/FormFooter";
import classNames from "classnames";

const Login = ({ theme }) => {
  // props
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const remember = localStorage.getItem("remember_me");
  const user = localStorage.getItem("userName");

  const message = useSelector((state) => state.auth.message);

  useEffect(() => {
    message?.status === true &&
      dispatch({ type: authConstants.RESET_SUCCESS, payload: [] });
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("remember_me", remember);
    localStorage.setItem("userName", user ? user : "");
    dispatch(login(userName, password, history));
  };
  return (
    <section
      className={classNames(
        "bg-gray-50 dark:bg-gray-900",
        theme === "dark" && "bg-gray-800"
      )}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className={classNames(
            "flex items-center mb-6 text-2xl font-semibold text-gray-900",
            theme === "dark" && "text-slate-300"
          )}
        >
          <img className="w-8 h-8 mr-2" src="blog.png" alt="logo" />
          Blogs
        </Link>
        <div
          className={classNames(
            "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            theme === "dark" && "bg-gray-300"
          )}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="poojan"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/forgot-password"
                  className={classNames(
                    "font-medium text-primary-600 hover:underline",
                    theme === "dark" && " text-slate-800"
                  )}
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                disabled={loading}
                className={classNames(
                  "w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ",
                  theme === "dark" &&
                    "bg-slate-800 border-slate-700 hover:bg-slate-600 hover:border-slate-500"
                )}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Dont have an account yet?{" "}
                <Link
                  to="/register"
                  className={classNames(
                    "font-medium text-primary-600 hover:underline",
                    theme === "dark" && " text-slate-800"
                  )}
                >
                  Sign up
                </Link>
                <Link
                  to="/reset"
                  className={classNames(
                    "font-medium text-primary-600 hover:underline ml-[3rem]",
                    theme === "dark" && " text-slate-800"
                  )}
                >
                  Unverified?
                </Link>
              </p>
              <Footer />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
