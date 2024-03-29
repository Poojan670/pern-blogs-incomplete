import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import * as API from "../../Redux/Auth/api";
import { IoIosNotifications } from "react-icons/io";
import classNames from "classnames";

const DashboardNav = ({ isOpen, setIsOpen, theme }) => {
  const [userData, setUserData] = useState();

  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  const [profile, setProfile] = useState(false);
  const [notification, setNotification] = useState(false);

  const ToggleProfile = () => {
    if (profile) {
      setProfile(false);
    } else {
      setProfile(true);
      setNotification(false);
    }
  };

  const ToggleNotification = () => {
    if (notification) {
      setNotification(false);
    } else {
      setNotification(true);
      setProfile(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  useEffect(() => {
    const user = async () => {
      const data = await API.user();
      setUserData(data.data);
    };
    user().catch((e) => console.log(e.msg));
  }, []);

  const profileTextClass = classNames(
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
    theme === "dark" && " hover:bg-gray-600 hover:text-white"
  );

  const sideBarClass = classNames(
    "inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ",
    theme === "dark" && "text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
  );
  return (
    <>
      <nav
        className={classNames(
          "fixed top-0 z-50 w-full bg-gray-50 border-b border-gray-200 ",
          theme === "dark" && "bg-gray-800 border-gray-700"
        )}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={ToggleSidebar}
                className={sideBarClass}
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ml-2 md:mr-24">
                <img src="blog.png" className="h-8 mr-3" alt="Logo" />
                <span
                  className={classNames(
                    "self-center text-xl font-semibold sm:text-2xl whitespace-nowrap",
                    theme === "dark" && "text-slate-300"
                  )}
                >
                  Blogs
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <span
                className={classNames(
                  "font-bold opacity-50 md:flex mx-auto mt-1",
                  theme === "dark" && "text-slate-300 opacity-100"
                )}
                color="#888888"
              >
                Hello {userData?.fullName} !
              </span>
              <div className="flex items-center ml-3">
                <IoIosNotifications
                  onClick={ToggleNotification}
                  className={classNames(
                    "flex-shrink-0 w-6 h-6 mr-5 mt-1 text-gray-500 transition duration-75  group-hover:text-gray-900 cursor-pointer ",
                    theme === "dark" && "group-hover:text-white text-slate-300"
                  )}
                />
                <div className="absolute top-1 px-1.5 py-0.5 translate-x-1/2 bg-red-500 border border-white rounded-full text-xs text-white">
                  12
                </div>
                <div
                  className={`z-8 ml-[-150px] w-44 mt-[8rem] bg-white rounded divide-y divide-gray-100 shadow ${
                    notification ? "absolute" : "hidden"
                  }`}
                >
                  <div className="px-2 py-3">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 flex justify-center">
                      poojan
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Notify
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={ToggleProfile}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src={userData?.img}
                      alt=""
                    />
                  </button>
                  <div
                    className={`z-10 ml-[-150px] w-44 bg-white rounded divide-y divide-gray-100 shadow ${
                      profile ? "absolute" : "hidden"
                    }`}
                  >
                    <div className="px-2 py-3">
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300 flex justify-center"
                        role="none"
                      >
                        {userData?.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/"
                          className={profileTextClass}
                          role="menuitem"
                        >
                          Home
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
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && <SideBar theme={theme} />}
    </>
  );
};

export default DashboardNav;
