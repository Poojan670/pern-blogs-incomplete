import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Author from "./sub-components/Author";
import * as API from "../dashboard/Redux/Blogs/api";
import moment from "moment";

const Latest = ({ theme }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const blogs = async () => {
      const blogsList = await API.getAllBlogs();
      setBlogs(blogsList.data.results);
    };
    blogs().catch((e) => console.log(e.msg));
  }, []);
  return (
    <div
      className={classNames("bg-gray-50", theme === "dark" && "bg-gray-800")}
    >
      <section className="container mx-auto md:px-20 py-10">
        <h1
          className={classNames(
            "font-bold text-4xl py-12 text-center",
            theme === "dark" && "text-slate-300"
          )}
        >
          Latest Posts
        </h1>
        {/* grid columns */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {blogs.map((blog) => (
            <Post key={blog.id} blog={blog} theme={theme} />
          ))}
        </div>
      </section>
    </div>
  );
};

function Post({ theme, blog }) {
  return (
    <div className="relative">
      <div className="images flex-1">
        <Link to={`/blogs?category=${blog?.Category?.id}`}>
          <img
            src={blog?.img}
            alt=""
            width={500}
            height={350}
            className="rounded"
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-center py-4">
        <div className="relative">
          <Link
            to={`/blogs?category=${blog?.Category?.id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {blog?.Category?.title}
          </Link>
          <Link
            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
            className={classNames(
              "ml-2 text-gray-800 hover:text-gray-600",
              theme === "dark" && "text-slate-300 hover:text-slate-500"
            )}
          >
            - {moment(blog?.createdAt).fromNow()}
          </Link>
        </div>
        <Link
          to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
          className={classNames(
            "text-xl font-bold text-gray-800 hover:text-gray-600",
            theme === "dark" && "text-slate-300"
          )}
        >
          {blog?.title}
        </Link>
        <p className="text-gray-500 py-3 overflow-hidden">
          {blog?.content.length < 200
            ? blog?.content
            : blog?.content?.substring(1, 150) + "..."}
        </p>
        <div className="md:absolute bottom-0 md:top-[26rem] ">
          <Author blog={blog} theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default Latest;
