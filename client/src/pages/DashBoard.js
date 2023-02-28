import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import UserList from "./UserList";
import * as API from "../Redux/Auth/api";

const DashBoard = () => {
  const [isOpen, setIsopen] = useState(false);
  const [userData, setUserData] = useState();
  const [userList, setUserList] = useState([]);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const [profile, setProfile] = useState(false);

  const ToggleProfile = () => {
    profile === true ? setProfile(false) : setProfile(true);
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

  useEffect(() => {
    const users = async () => {
      const userList = await API.userList(1, 10);
      setUserList(userList.data.results);
    };
    users().catch((e) => console.log(e.msg));
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={ToggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ml-2 md:mr-24">
                <img src="blog.png" className="h-8 mr-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Blogs
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <span
                className="font-bold opacity-50 md:flex mx-auto mt-1"
                color="#888888"
              >
                Hello {userData?.username} !
              </span>
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    onClick={ToggleProfile}
                  >
                    <img
                      className="w-8 h-8 rounded-full"
                      src="images/gintoki.png"
                    />
                  </button>
                  <div
                    className={`z-10 ml-[-150px] w-44 bg-white rounded divide-y divide-gray-100 shadow ${
                      profile ? "absolute" : "hidden"
                    }`}
                  >
                    <div className="px-2 py-3">
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {userData?.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && <SideBar />}
      <UserList isOpen={isOpen} userList={userList} />
    </>
  );
};

export default DashBoard;
