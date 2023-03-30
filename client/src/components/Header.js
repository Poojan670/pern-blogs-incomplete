import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";

const Header = ({ theme }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(false);
  const ToggleProfile = () => {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  const headerClass = `${theme === "dark" ? "bg-gray-800" : ""} bg-gray-50`;

  const profileTextClass = classNames(
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
    theme === "dark" && " hover:bg-gray-600 hover:text-white"
  );

  const searchClass =
    "mt-1 block w-60 px-3 py-2 bg-white border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-500 focus: outline-none focus:border-sky-500 focus:ring-sky-500";

  return (
    <header className={headerClass}>
      <div
        className="xl:container xl:mx-auto flex flex-col 
            items-center sm:flex-row sm:justify-between text-center py-3"
      >
        <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
          <input type="text" placeholder="Search.." className={searchClass} />
        </div>
        <div className="shrink w-80 sm:order-2">
          <Link
            to="/"
            className={classNames(
              "font-bold uppercase text-3xl",
              theme === "dark" && "text-slate-300"
            )}
          >
            Blogs
          </Link>
        </div>
        <div className="w-96 order-3 flex justify-center">
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/Hunt3rr/"
              target="_blank"
              className="mt-2"
              rel="noreferrer"
            >
              <ImFacebook color="#888888" />
            </a>
            <a
              href="https://twitter.com/po0_jan"
              target="_blank"
              className="mt-2"
              rel="noreferrer"
            >
              <ImTwitter color="#888888" />
            </a>
            <a
              href="https://www.linkedin.com/in/poojan-pradhan-8709b0217/"
              target="_blank"
              className="mt-2"
              rel="noreferrer"
            >
              <ImLinkedin2 color="#888888" />
            </a>
            {isAuthenticated ? (
              <>
                <p
                  className={classNames(
                    "font-bold opacity-50 md:flex mt-[0.35rem]",
                    theme === "dark" && "text-gray-50 opacity-80"
                  )}
                >
                  Welcome {userData?.userName} 😄
                </p>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4
                     focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={ToggleProfile}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userData?.img}
                      alt=""
                    />
                  </button>
                  <div
                    className={`z-10 ml-[-150px] w-44 bg-white rounded divide-y
                     divide-gray-100 shadow ${profile ? "absolute" : "hidden"}`}
                  >
                    <div className="px-2 py-3">
                      <p
                        className="text-sm font-medium text-gray-900 truncate
                          flex justify-center"
                        role="none"
                      >
                        {userData?.userName}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/dashboard"
                          className={profileTextClass}
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className={profileTextClass}>
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          onClick={handleLogout}
                          className={profileTextClass}
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={classNames(
                    "font-bold opacity-50 md:flex mt-[0.35rem]",
                    theme === "dark" && "text-white"
                  )}
                  color="#888888"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={classNames(
                    "font-bold opacity-50 md:flex mt-[0.35rem]",
                    theme === "dark" && "text-white"
                  )}
                  color="#888888"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
