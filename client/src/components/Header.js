import React from "react";
import { useSelector } from "react-redux";

import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.username);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <header className="bg-gray-50">
      <div
        className="xl:container xl:mx-auto flex flex-col 
            items-center sm:flex-row sm:justify-between text-center py-3"
      >
        <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
          <input
            type="text"
            placeholder="Search.."
            className="mt-1 block w-60 px-3 py-2 bg-white border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-500 focus: outline-none focus:border-sky-500 focus:ring-sky-500"
          />
        </div>
        <div className="shrink w-80 sm:order-2">
          <a href="/" className="font-bold uppercase text-3xl">
            Blogs
          </a>
        </div>
        <div className="w-96 order-3 flex justify-center">
          <div className="flex gap-6">
            <a href="https://www.facebook.com/Hunt3rr/" target="_blank">
              <ImFacebook color="#888888" />
            </a>
            <a href="https://twitter.com/po0_jan" target="_blank">
              <ImTwitter color="#888888" />
            </a>
            <a
              href="https://www.linkedin.com/in/poojan-pradhan-8709b0217/"
              target="_blank"
            >
              <ImLinkedin2 color="#888888" />
            </a>
            {isAuthenticated ? (
              <>
                <a className="font-bold opacity-50 md:flex mx-auto -my-0.5">
                  Welcome {username} 😄
                </a>
                <a
                  href="/"
                  onClick={handleLogout}
                  className="font-bold opacity-50 md:flex mx-auto -my-0.5"
                  color="#888888"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="font-bold opacity-50 md:flex mx-auto -my-0.5"
                  color="#888888"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="font-bold opacity-50 md:flex mx-auto -my-0.5"
                  color="#888888"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
