import React, { useEffect, useState } from "react";
import Wrapper from "../layout/Wrapper";
import Author from "../components/sub-components/Author";
import Related from "../components/sub-components/Related";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogSummary,
  getRelatedBlogs,
  getBlogComments,
  postBlogComments,
} from "../dashboard/Redux/Blogs/thunk";
import moment from "moment";
import classNames from "classnames";
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";

const Blogs = ({ theme }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");

  const { id, categoryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogSummary(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getRelatedBlogs(id, categoryId));
  }, [dispatch, id, categoryId]);

  useEffect(() => {
    dispatch(getBlogComments(id));
  }, [dispatch, id]);

  const { blog, relatedBlogs, blogComments } = useSelector(
    (state) => state.blog
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function findObjectsByParentId(data, parentId) {
    const result = [];
    for (const item of data) {
      if (item.parent === parentId) {
        result.push(item);
        result.push(...findObjectsByParentId(data, item.id));
      }
    }
    return result;
  }

  const handleComment = async () => {
    dispatch(postBlogComments(blog?.id, content));
  };

  return (
    <Wrapper theme={theme}>
      <div
        className={classNames("bg-gray-50", theme === "dark" && "bg-gray-800")}
      >
        <section className="container mx-auto md:px-2 py-16 w-1/2">
          <div className="flex justify-start">
            <Author theme={theme} blog={blog} />
          </div>
          <span className="text-base font-light text-gray-500 ">
            {moment.duration(moment().diff(blog?.createdAt) > 7)
              ? moment(blog?.createdAt).fromNow()
              : moment(blog?.createdAt).format("MM/DD/YYYY")}
          </span>
          <div className="text-base font-light text-gray-500 ">
            <div className="flex justify-start mt-2">
              <h4>Tags: </h4>
              {blog?.Tags?.map((tag, i) => {
                return (
                  <div className="" key={i}>
                    <p>
                      {tag?.title}
                      {i !== blog.Tags.length - 1 && <span>, </span>}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="post py-10">
            <h1
              className={classNames(
                "mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl",
                theme === "dark " && "text-gray-50"
              )}
            >
              {blog?.title}
            </h1>

            <p
              className={classNames(
                "text-gray-500 text-xl text-start font-light",
                theme === "dark" && "text-slate-400"
              )}
            >
              {blog?.content}
            </p>
            <div className="py-10">
              <img src={blog?.img} alt="" width={900} height={600} />
            </div>
            <div
              className={classNames(
                "text-gray-600 text-lg flex flex-col gap-4",
                theme === "dark" && "text-slate-400"
              )}
            >
              {blog?.PostContents?.map((data, i) => {
                return (
                  <div key={i}>
                    <p>{data?.content}</p>
                    {data?.img ? (
                      <div className="py-5">
                        <img src={data?.img} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ratings */}
          <div className="flex items-center py-5">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-800"
                  }
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span>&#9733;</span>
                </button>
              );
            })}
            <p class="ml-2 text-sm font-bold text-gray-900">
              {blog?.averageRatings}
            </p>
            <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <a
              href="#"
              class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
              {blog?.ratingsCount} reviews
            </a>
          </div>

          {/* Comments */}
          <section className="not-format">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                Discussion ({blog?.commentsCount})
              </h2>
              {/* Likes */}
              <div className="flex justify-between">
                <span className="font-bold mr-2 mt-1">{blog?.likesCount}</span>
                <AiFillLike
                  className={classNames(
                    "mr-5 cursor-pointer hover:text-blue-500",
                    !isAuthenticated && "cursor-not-allowed"
                  )}
                  size={30}
                />
                <span className="font-bold mr-2 mt-1">
                  {blog?.dislikesCount}
                </span>
                <AiFillDislike
                  size={30}
                  className={classNames(
                    "mr-5 cursor-pointer hover:text-blue-500",
                    !isAuthenticated && "cursor-not-allowed"
                  )}
                />
              </div>
            </div>
            {isAuthenticated ? (
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="comment" className="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 outline-none focus:ring-0"
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4
                       focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Post comment
                </button>
              </form>
            ) : (
              <div className="text-md p-0">
                Want to comment ? Please{" "}
                <span className="underline text-blue-600 cursor-pointer">
                  <Link to="/login">Login!</Link>
                </span>
              </div>
            )}

            {blogComments
              .filter((item) => item.parent == null)
              ?.map((comment, i) => {
                return (
                  <article
                    key={i}
                    className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900"
                  >
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={comment?.img}
                            alt="commentAuthor"
                          />
                          {comment?.userName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            pubdate
                            datetime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            {comment?.createdAt?.substring(0, 10)}
                          </time>
                        </p>
                      </div>
                      <button
                        id="dropdownComment1Button"
                        data-dropdown-toggle="dropdownComment1"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400
                           bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50
                            dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>
                      <div
                        id="dropdownComment1"
                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownMenuIconHorizontalButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Remove
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Report
                            </a>
                          </li>
                        </ul>
                      </div>
                    </footer>
                    <p>{comment?.content}</p>
                    <div className="flex items-center mt-4 space-x-4">
                      <button
                        type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                      >
                        <svg
                          aria-hidden="true"
                          className="mr-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0
                                4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 
                                20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418
                                 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                        Reply
                      </button>
                    </div>
                    {findObjectsByParentId(blogComments, comment?.id)?.map(
                      (reply, i) => {
                        return (
                          <article
                            key={i}
                            className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                          >
                            <footer className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                  <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src={reply?.img}
                                    alt=""
                                  />
                                  {reply?.userName}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  <time
                                    pubdate
                                    datetime="2022-02-12"
                                    title="February 12th, 2022"
                                  >
                                    {reply?.createdAt?.substring(0, 10)}
                                  </time>
                                </p>
                              </div>
                              <button
                                id="dropdownComment2Button"
                                data-dropdown-toggle="dropdownComment2"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400
                           bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50
                            dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                </svg>
                                <span className="sr-only">
                                  Comment settings
                                </span>
                              </button>
                              <div
                                id="dropdownComment2"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                              >
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownMenuIconHorizontalButton"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Remove
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Report
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </footer>
                            <p>{reply?.content}</p>
                            <div className="flex items-center mt-4 space-x-4">
                              <button
                                type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="mr-1 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21
                               12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 
                               20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 
                               3.582 9 8z"
                                  ></path>
                                </svg>
                                Reply
                              </button>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </article>
                );
              })}

            {/* <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos"
                    />
                    Jese Leos
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      datetime="2022-02-12"
                      title="February 12th, 2022"
                    >
                      Feb. 12, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment2Button"
                  data-dropdown-toggle="dropdownComment2"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400
                           bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50
                            dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div
                  id="dropdownComment2"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>Much appreciated! Glad you liked it ☺️</p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21
                               12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 
                               20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 
                               3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article> */}
            {/* <article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green"
                    />
                    Bonnie Green
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      datetime="2022-03-12"
                      title="March 12th, 2022"
                    >
                      Mar. 12, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment3Button"
                  data-dropdown-toggle="dropdownComment3"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400
                           bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none
                            focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700
                             dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                  <span className="sr-only">Comment settings</span>
                </button>
                <div
                  id="dropdownComment3"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>
                The article covers the essentials, challenges, myths and stages
                the UX designer should consider while creating the design
                strategy.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 
                      9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3
                       12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article>
            <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                      alt="Helene Engels"
                    />
                    Helene Engels
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time pubdate datetime="2022-06-23" title="June 23rd, 2022">
                      Jun. 23, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment4Button"
                  data-dropdown-toggle="dropdownComment4"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
                <div
                  id="dropdownComment4"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Remove
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p>
                Thanks for sharing this. I do came from the Backend development
                and explored some of the tools to design my Side Projects.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  Reply
                </button>
              </div>
            </article> */}
          </section>

          {/* Related */}
          <Related theme={theme} blogs={relatedBlogs} />
        </section>
      </div>
    </Wrapper>
  );
};

export default Blogs;
