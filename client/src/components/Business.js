import classNames from "classnames";
import React from "react";
import Author from "./sub-components/Author";

const Business = ({ theme }) => {
  const bg = {
    background:
      theme === "dark"
        ? "url('images/test.png')no-repeat"
        : "url('images/kagura.png')no-repeat",
    backgroundPosition: theme === "dark" ? "top" : "right",
    backgroundColor:
      theme === "dark" ? "rgb(31, 41, 55)" : "rgb(249, 250, 251)",
  };
  return (
    <div
      className={classNames("bg-gray-50", theme === "dark" && "bg-gray-800")}
    >
      <section className="container mx-auto md:px-20 py-16" style={bg}>
        <div className="grid lg:grid-cols-2">
          <div className="item">
            <h1
              className={classNames(
                "font-bold text-4xl py-12",
                theme === "dark" && "text-slate-300"
              )}
            >
              Business
            </h1>
            <div className="flex flex-col gap-6">
              <Post theme={theme} />
              <Post theme={theme} />
              <Post theme={theme} />
              <Post theme={theme} />
            </div>
          </div>
          <div className="item">
            <h1
              className={classNames(
                "font-bold text-4xl py-12",
                theme === "dark" && "text-slate-300"
              )}
            >
              Travel
            </h1>
            <div className="flex flex-col gap-6">
              <Post theme={theme} />
              <Post theme={theme} />
              <Post theme={theme} />
              <Post theme={theme} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function Post({ theme }) {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <a href="/#">
          <img
            src="images/gintoki.png"
            alt=""
            width={300}
            height={250}
            className="rounded"
          />
        </a>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="category">
          <a href="/#" className="text-orange-600 hover:text-orange-800">
            Business Travel
          </a>
          <a href="/#" className="text-gray-800 hover:text-gray-600">
            -July 23,2022
          </a>
        </div>
        <div className="title">
          <a
            href="/#"
            className={classNames(
              "text-xl font-bold text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300"
            )}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </a>
        </div>
        <Author theme={theme} />
      </div>
    </div>
  );
}

export default Business;
