import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { verify, reSendToken } from "../Redux/Auth/thunk";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.auth.loading_verify);
  const loadingResend = useSelector((state) => state.auth.loading_resend_token);
  const email = useSelector((state) => state.auth.email);

  const onSubmit = () => {
    dispatch(verify(token, history));
  };

  const reSendSubmit = () => {
    dispatch(reSendToken(email));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="blog.png" alt="logo" />
          Blogs
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Verify your email
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Verification Token
              </label>
              <input
                type="text"
                name="verify-token"
                id="verify-token"
                onChange={(e) => setToken(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="asdkuohfaoishfd1h23uh12"
                required=""
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              onClick={onSubmit}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded "
            >
              Verify your email
            </button>
            <button
              type="submit"
              disabled={loadingResend}
              onClick={reSendSubmit}
              className="rounded-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mx-[35%] border-b-4 border-blue-700 hover:border-blue-500"
            >
              Resend
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
