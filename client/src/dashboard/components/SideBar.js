import React from "react";
import { RiDashboard2Fill, RiInboxArchiveFill } from "react-icons/ri";
import { FaComments } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdArticle } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { AiFillTags } from "react-icons/ai";
import classNames from "classnames";
import { useSelector } from "react-redux";

const SideBar = ({ theme }) => {
  const { role } = useSelector((state) => state.auth);
  const buttonClassName = classNames("flex-1", "ml-3", "whitespace-nowrap", {
    "text-gray-300": theme === "dark",
  });

  const mainClass = classNames(
    "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-fullbg-white border-r border-gray-200 sm:translate-x-0",
    theme === "dark" && " bg-gray-800 border-gray-700"
  );

  const linkClass = classNames(
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100",
    theme === "dark" && "hover:bg-gray-700 text-gray-300"
  );

  const sideBarClass = classNames(
    "h-full px-3 pb-4 overflow-y-auto bg-gray-50",
    theme === "dark" && "bg-gray-800"
  );

  const iconsClass = classNames(
    "w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900",
    theme === "dark" && "text-gray-300 group-hover:text-white"
  );

  const notificationClass = classNames(
    "inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm              font-medium text-blue-800 bg-blue-100 rounded-ful",
    theme === "dark" && "bg-blue-900 text-blue-300"
  );

  return (
    <aside id="logo-sidebar" className={mainClass} aria-label="Sidebar">
      <div className={sideBarClass}>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className={linkClass}>
              <RiDashboard2Fill className={iconsClass} />
              <span className={buttonClassName}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/" className={linkClass}>
              <FaComments className={iconsClass} />
              <span className={buttonClassName}>Comments</span>
            </Link>
          </li>
          <li>
            <Link to="/" className={linkClass}>
              <RiInboxArchiveFill className={iconsClass} />
              <span className={buttonClassName}>Notification</span>
              <span className={notificationClass}>3</span>
            </Link>
          </li>
          {role === "ADMIN" ? (
            <li>
              <Link to="/users" className={linkClass}>
                <HiUsers className={iconsClass} />
                <span className={buttonClassName}>Users</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {role === ("ADMIN" || "MOD") ? (
            <li>
              <Link to="/blogs-category" className={linkClass}>
                <MdCategory className={iconsClass} />
                <span className={buttonClassName}>Category</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          {role === ("ADMIN" || "MOD") ? (
            <li>
              <Link to="/tags" className={linkClass}>
                <AiFillTags className={iconsClass} />
                <span className={buttonClassName}>Tags</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li>
            <Link to="/blogs-lists" className={linkClass}>
              <MdArticle className={iconsClass} />
              <span className={buttonClassName}>Blogs</span>
            </Link>
          </li>
          <li>
            <Link to="/" className={linkClass}>
              <AiOutlineLogout className={iconsClass} />
              <span className={buttonClassName}>Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
