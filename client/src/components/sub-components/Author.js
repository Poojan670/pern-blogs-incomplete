import classNames from "classnames";
import React from "react";

const Author = ({ theme }) => {
  return (
    <div className="author flex py-5">
      <img
        src="/images/author/hijikata.png"
        alt=""
        className="rounded-full"
        width={60}
        height={60}
      />
      <div className="flex flex-col justify-center px-4">
        <a
          href="/#"
          className={classNames(
            "text-md font-bold text-gray-800 hover:text-gray-600",
            theme === "dark" && "text-slate-300 hover:text-gray-400"
          )}
        >
          Poojan Pradhan
        </a>
        <span className="text-sm text-gray-500">CEO And Founder</span>
      </div>
    </div>
  );
};

export default Author;
