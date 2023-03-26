import classNames from "classnames";
import React from "react";

const NewsLetter = ({ theme }) => {
  return (
    <section
      className={classNames(
        "bg-gray-50 mt-0",
        theme === "dark" && "bg-gray-800"
      )}
    >
      <div className="container mx-auto md:px-20 py-16 text-center">
        <h1
          className={classNames(
            "font-bold text-3xl",
            theme === "dark" && "text-slate-300"
          )}
        >
          Subscribe NewsLetter
        </h1>
        <div className="py-4">
          <input
            type="text"
            className="shadow border rounded w-9/12 py-3 px-3 text-gray-700 
                    focus:outline-none focus:shadow-outline"
            placeholder="Enter your Email.."
          />
        </div>
        <button
          className={classNames(
            "bg-blue-400 px-20 py-3 rounded-full text-gray-50 text-xl",
            theme === "dark" && "bg-slate-700"
          )}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default NewsLetter;
