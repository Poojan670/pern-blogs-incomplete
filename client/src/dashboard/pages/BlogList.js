import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import BlogsModal from "../Modal/Blogs";
import * as API from "../Redux/Blogs/api";
import moment from "moment";

const BlogList = ({ isOpen, setIsOpen, theme }) => {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userName = localStorage.getItem("userName");
  const { userid, role } = useSelector((state) => state.auth);

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const blogs = async () => {
      const blogsList =
        role === "ADMIN"
          ? await API.getAllBlogs()
          : await API.getAllMyBlogs(userid);
      setBlogs(blogsList.data.results);
      setCount(blogsList.data.count);
    };
    blogs().catch((e) => console.log(e.msg));
  }, []);

  return (
    <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen} theme={theme}>
      {showModal ? (
        <BlogsModal showModal={showModal} setShowModal={setShowModal} />
      ) : (
        <section className="bg-gray-50 mt-5">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                {userName.toUpperCase()}'s Blogs
              </h2>
              <div className="flex justify-between">
                <input
                  type="text"
                  placeholder="Search.."
                  className="block w-60 px-3 py-2 cursor-pointer hover:bg-gray-300 bg-gray-100 border-slate-300 rounded-full text-sm shadow-sm
                 placeholder-slate-500 focus: outline-none focus:border-sky-500 focus:ring-sky-500 text-black"
                />
                <button
                  type="button"
                  onClick={(e) => setShowModal(true)}
                  className="bg-blue-500 hover:animate-bounce hover:bg-black flex justify-center px-6 py-2 w-50 
                font-bold uppercase border-gray-200 cursor-pointer rounded-md text-gray-50 opacity-70 mt-2 border-solid whitespace-nowrap"
                >
                  Add Blogs
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {blogs.map((blog, i) => {
                const { title, slug, img, content, createdAt, Category, User } =
                  blog;
                return (
                  <div key={i} className="grid gap-4 relative">
                    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                      <div className="flex justify-center">
                        <Link
                          to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="rounded w-[500px] h-[90%]"
                          />
                        </Link>
                      </div>
                      <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span
                          className="bg-primary-100 text-primary-800
                         text-xs font-medium inline-flex items-center px-2.5 py-0.5 
                         rounded dark:bg-primary-200 dark:text-primary-800"
                        >
                          <svg
                            className="mr-1 w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 
                            2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 
                            00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                            ></path>
                          </svg>
                          {Category?.title}
                        </span>
                        <span className="text-sm">
                          {moment(createdAt).fromNow()}
                        </span>
                      </div>
                      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
                        <Link
                          to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
                        >
                          {title}
                        </Link>
                      </h2>
                      <p className="mb-5 font-medium text-gray-400 dark:text-gray-400 tracking-wide">
                        {content.length < 150
                          ? content
                          : content?.substring(1, 150)}
                      </p>
                      <div className="mt-[3rem]">
                        <div className="absolute bottom-0 left-2 right-0 p-4 flex justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              className="w-7 h-7 rounded-full"
                              src={User?.img}
                              alt="Jese Leos avatar"
                            />
                            <span className="font-medium dark:text-white">
                              {User?.userName}
                            </span>
                          </div>
                          <Link
                            to={`/blog-details/${blog?.id}/${blog?.categoryId}`}
                            className="inline-flex items-center
                             font-medium text-primary-600 hover:underline"
                          >
                            Read more
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 
                                1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0
                                 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </DashboardLayout>
  );
};

export default BlogList;
