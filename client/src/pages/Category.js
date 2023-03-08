import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import * as API from "../Redux/Category/api";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import CategoryModal from "../Modal/Category";

const Category = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const categories = async () => {
      const categoryList = await API.categoryList(1, 10);
      setCategories(categoryList.data.results);
      setCount(categoryList.data.count);
    };
    categories().catch((e) => console.log(e.msg));
  }, []);

  const onClickModal = async () => {
    showModal === false ? setShowModal(true) : setShowModal(false);
  };

  return (
    <>
      <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen}>
        {showModal ? (
          <CategoryModal showModal={showModal} setShowModal={setShowModal} />
        ) : (
          <div
            className={
              isOpen
                ? "relative flex flex-col ml-[16rem] w-[90%] min-w-0 mb-0 mt-[5rem] break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
                : "relative flex flex-col ml-50 w-full min-w-0 mb-0 mt-[5rem] break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border"
            }
          >
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onClickModal}
                className="bg-blue-500 flex justify-center px-6 w-10 font-bold uppercase border-gray-200 cursor-pointer rounded-full text-gray-50 opacity-70 mt-1 border-solid whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
              <h6 className="flex justify-center px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-blue-500 opacity-70">
                Blogs Categories
              </h6>
            </div>
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        S.N
                      </th>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        TITLE
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Author
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Parent
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        createdAt
                      </th>
                      <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((user, i) => {
                      const { title, slug, userName, createdAt, parentTitle } =
                        user;
                      return (
                        <tr key={i}>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <h6 className="absolute mb-0 leading-normal text-bold ml-6">
                              {i + 1}
                            </h6>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">
                                  {title}
                                </h6>
                                <p className="mb-0 leading-tight text-xs text-slate-400">
                                  {slug}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 font-semibold leading-tight text-xs">
                              {userName}
                            </p>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                            <span className="bg-gradient-to-tl text-bold px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold leading-none">
                              {parentTitle}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {createdAt?.substring(0, 10)}
                            </span>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <Link
                              to="/user/id"
                              className="font-semibold leading-tight text-xs text-slate-400"
                            >
                              {" "}
                              Edit{" "}
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
                      1-10
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
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Category;
