import classNames from "classnames";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Author from "./Author";

const Related = ({ theme, blogs }) => {
  return (
    <section className="pt-20">
      <h1
        className={classNames(
          "font-bold text-3xl py-10",
          theme === "dark" && "text-gray-50"
        )}
      >
        Related
      </h1>

      <div className="flex flex-col gap-10">
        {blogs.map((blog, i) => {
          return <Post key={i} blog={blog} theme={theme} />;
        })}
      </div>
    </section>
  );
};

function Post({ blog, theme }) {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link to="/#">
          <img
            src={blog?.img}
            alt=""
            width={300}
            height={200}
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="category">
          <Link to="/#" className="text-orange-600 hover:text-orange-800">
            {blog?.Category?.title}
          </Link>
          <Link to="/#" className="text-gray-800 hover:text-gray-600 ml-5">
            {moment(blog?.createdAt).fromNow()}
          </Link>
        </div>
        <div className="title">
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {blog?.title}
          </Link>
        </div>
        <Author blog={blog} theme={theme} />
      </div>
    </div>
  );
}

export default Related;
