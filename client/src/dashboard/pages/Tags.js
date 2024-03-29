import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layout/DashboardLayout";
import * as API from "../Redux/Tags/api";
import { Link } from "react-router-dom";
import TagsModal from "../Modal/Tags";
import { tagsConstants } from "../Redux/Tags/constants";
import {
  getAllTags,
  getTag,
  getPageTags,
  handleSearch,
} from "../Redux/Tags/thunk";
import useDebounce from "../../utils/useDebounce";
import defaultLimit from "../../utils/paginationDefault";

const Tags = ({ isOpen, setIsOpen, theme }) => {
  // const [tags, setTags] = useState([]);
  // const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.tags);
  // const search = useSelector((state) => state.tag.search);
  const [search, setSearch] = useState("");
  // const next = useSelector((state) => state.manufacturer.next);
  // const previous = useSelector((state) => state.manufacturer.previous);
  const count = useSelector((state) => state.tag.count);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // for pagination
  const [pageNumberLimit] = useState(5);

  // // change page
  // const paginate = (number) => {
  //   dispatch(getPageTags({ number, postsPerPage }));
  // };

  const handleEdit = async (tag) => {
    dispatch({ type: tagsConstants.EDIT_TAGS, payload: tag });
    setShowModal(true);
  };

  //pagination end
  //loading
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (postsPerPage === 0) {
      if (search === "") {
        dispatch(getTag(count));
      } else {
        dispatch(handleSearch(debouncedSearch, count));
      }
    } else {
      if (search === "") {
        if (postsPerPage === defaultLimit) {
          dispatch(getTag(postsPerPage));
        } else {
          setCurrentPage(1);
          dispatch(getTag(postsPerPage));
        }
      } else {
        setCurrentPage(1);
        setMaxPageNumberLimit(5);
        setMinPageNumberLimit(0);
        dispatch(handleSearch(debouncedSearch, postsPerPage));
      }
    }
  }, [dispatch, postsPerPage, debouncedSearch]);

  return (
    <>
      <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen} theme={theme}>
        {showModal ? (
          <TagsModal showModal={showModal} setShowModal={setShowModal} />
        ) : (
          <div
            className={
              isOpen
                ? "relative flex flex-col ml-[16rem] w-[80%] min-w-0 mb-0 mt-[5rem] break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
                : "relative flex flex-col ml-50 w-full min-w-0 mb-0 mt-[5rem] break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
            }
          >
            <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
              <h6 className="flex justify-between px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-blue-500 opacity-70">
                <span className="text-3xl hover:animate-pulse hover:bg-gray-50">
                  𝒯𝒜𝒢𝒮
                </span>
                <input
                  type="text"
                  placeholder="Search.."
                  onChange={(e) => {
                    setSearch(e.target.value.trimStart());
                  }}
                  className="block w-60 px-3 py-2 hover:bg-gray-300 bg-gray-100 border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-500 focus: outline-none focus:border-sky-500 focus:ring-sky-500 text-black"
                />
                <button
                  type="button"
                  onClick={(e) => setShowModal(true)}
                  className="bg-blue-500 hover:animate-bounce hover:bg-black flex justify-center px-6 w-10 font-bold uppercase border-gray-200 cursor-pointer rounded-md text-gray-50 opacity-70 mt-2 border-solid whitespace-nowrap"
                >
                  Add
                </button>
              </h6>
            </div>
            <div>
              <table
                className={
                  isOpen
                    ? "md:w-[64rem] lg:w-[104rem] text-sm text-left text-gray-500 dark:text-gray-400"
                    : "w-full text-sm text-left text-gray-500 dark:text-gray-400"
                }
              >
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">SN</div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3">
                      createdAt
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((tag, i) => {
                    const { title, slug, createdAt } = tag;
                    return (
                      <tr
                        key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {title}
                        </th>
                        <td className="px-6 py-4">
                          <p className="mb-0 leading-tight text-xs text-slate-400">
                            {slug}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {createdAt?.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={(e) => handleEdit(tag)}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <nav
                className="flex items-center justify-between pt-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-{count}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {count}
                  </span>
                </span>
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <Link
                      to="#"
                      className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      aria-current="page"
                      className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      100
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Tags;
