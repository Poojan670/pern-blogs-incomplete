import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const Author = ({ theme, blog }) => {
  return (
    <div className="author flex py-5">
      <img
        src={blog?.User?.img}
        alt=""
        className="rounded-full"
        width={60}
        height={60}
      />
      <div className="flex flex-col justify-center px-4">
        <Link
          to="/#"
          className={classNames(
            "text-md font-bold text-gray-800 hover:text-gray-600",
            theme === "dark" && "text-slate-300 hover:text-gray-400"
          )}
        >
          {blog?.User?.userName}
        </Link>
        <span className="text-sm text-gray-500">{blog?.User?.role}</span>
      </div>
    </div>
  );
};

export default Author;
