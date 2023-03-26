import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/sub-components/FormFooter";
import { register } from "../Redux/Auth/thunk";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import classNames from "classnames";

const Register = ({ theme }) => {
  const { loading, loading_register } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    userName: "",
    password: "",
    fullName: "",
  };

  const [data, setData] = useState(initialValues);
  const [file, setFile] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    showPassword === false ? setShowPassword(true) : setShowPassword(false);
  };

  const handleRegister = () => {
    dispatch(
      register(
        data.email,
        data.userName,
        data.password,
        data.fullName,
        file,
        history
      )
    );
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center p-10 mx-auto">
          <img src="spinner.gif" alt="spinner" />
        </div>
      ) : (
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
                "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0",
                theme === "dark" && "bg-gray-300 border-gray-300"
              )}
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
                </h1>
                <form
                  className="space-y-4 md:space-y-6 lg:space-y-2"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={data.email}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your username
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={data.userName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="poojan"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your fullname
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={data.fullName}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Poojan Pradhan"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div>
                      {showPassword ? (
                        <AiFillEye
                          onClick={togglePassword}
                          className="float-right -mb-[90px] mt-[10px] w-[3rem] h-6 cursor-pointer"
                        />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={togglePassword}
                          className="float-right -mb-[90px] mt-[10px] w-[3rem] h-6 cursor-pointer"
                        />
                      )}
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={data.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="img"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your image
                    </label>
                    <input
                      type="file"
                      alt="img"
                      name="img"
                      value={""}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <Link
                          className={classNames(
                            "font-medium text-primary-600 hover:underline dark:text-primary-500",
                            theme === "dark" && "text-slate-800"
                          )}
                          to="/"
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={loading_register}
                    className={classNames(
                      "w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ",
                      theme === "dark" &&
                        "bg-slate-800 border-slate-700 hover:bg-slate-600 hover:border-slate-500"
                    )}
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className={classNames(
                        "font-medium text-primary-600 hover:underline",
                        theme === "dark" && " text-slate-800"
                      )}
                    >
                      Login here
                    </Link>
                  </p>
                  <Footer />
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
