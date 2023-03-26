import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { forgotPassword } from "../Redux/Auth/thunk";
import Footer from "../components/sub-components/FormFooter";
import classNames from "classnames";

const ForgotPassword = ({ theme }) => {
  // props
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    dispatch(forgotPassword(email, history));
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
            theme === "dark" && "bg-gray-400"
          )}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Confirm your email
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="admin@gmail.com"
                  required="true"
                />
              </div>
              <button
                type="submit"
                onClick={handleForgotPassword}
                disabled={loading}
                className={classNames(
                  "w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ",
                  theme === "dark" &&
                    "bg-slate-800 border-slate-700 hover:bg-slate-600 hover:border-slate-500"
                )}
              >
                Send
              </button>
              <p className="text-sm font-light text-gray-500 flex justify-center dark:text-gray-400">
                <Link
                  to="/login"
                  className={classNames(
                    "font-medium text-primary-600 hover:underline",
                    theme === "dark" && " text-slate-800"
                  )}
                >
                  Go back
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

export default ForgotPassword;
