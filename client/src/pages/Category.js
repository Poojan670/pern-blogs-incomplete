import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../layout/DashboardLayout";
import * as API from "../Redux/Category/api";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import CategoryModal from "../Modal/Category";
import { categoryConstants } from "../Redux/Category/constants";

const Category = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const categories = async () => {
      const categoryList = await API.categoryList(1, 10);
      setCategories(categoryList.data.results);
      setCount(categoryList.data.count);
    };
    categories().catch((e) => console.log(e.msg));
  }, []);

  const onClickModal = async (category) => {
    dispatch({ type: categoryConstants.EDIT_CATEGORY, payload: category });
    showModal === false ? setShowModal(true) : setShowModal(false);
  };

  return (
    <>
      <DashboardLayout isOpen={isOpen} setIsOpen={setIsOpen}>
        {showModal ? (
          <CategoryModal
            showModal={showModal}
            setShowModal={setShowModal}
            onClickModal={onClickModal}
          />
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
                  𝓑𝓵𝓸𝓰𝓼 𝓒𝓪𝓽𝓮𝓰𝓸𝓻𝓲𝓮𝓼
                </span>
                <input
                  type="text"
                  placeholder="Search.."
                  className="block w-60 px-3 py-2 hover:bg-gray-300 bg-gray-100 border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-500 focus: outline-none focus:border-sky-500 focus:ring-sky-500 text-black"
                />
                <button
                  type="button"
                  onClick={onClickModal}
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
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Parent
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
                  {categories.map((category, i) => {
                    const { title, slug, userName, createdAt, parent } =
                      category;
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
                          <p className="mb-0 leading-tight text-xs text-slate-400">
                            {slug}
                          </p>
                        </th>

                        <td className="px-6 py-2">
                          <button type="button">
                            <img
                              className="w-8 h-8 rounded-full ml-2"
                              src="images/me.jpg"
                              alt=""
                            />
                          </button>
                          <p className="mb-0 leading-tight text-xs text-slate-400 ml-1">
                            {userName}
                          </p>
                        </td>
                        <td className="px-6 py-4">{parent?.title}</td>
                        <td className="px-6 py-4">
                          {createdAt?.substring(0, 10)}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => onClickModal(category)}
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

export default Category;
