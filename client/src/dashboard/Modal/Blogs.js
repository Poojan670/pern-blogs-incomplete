import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AsyncPaginate } from "react-select-async-paginate";
import TextError from "../../TextError/TextError";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../utils/axios";
import { checkRedundantCategoryData } from "../../utils/RedundantData/checkRedundantCategoryData";
import { errorFunction } from "../../components/Alert/Alert";
import { createBlog, updateBlog } from "../Redux/Blogs/thunk";
import { clearAllDataAction } from "../Redux/Tags/action";
import PostsModal from "../Modal/Posts";

const Blogs = ({ showModel, setShowModal }) => {
  const { blog, edit } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  //state for disabling the submit button
  const [lock, setLock] = useState(false);
  const [showPostModel, setShowPostModel] = useState(false);

  const { posts } = useSelector((state) => state.post);

  const initialState = {
    title: edit ? blog?.title : "",
    slug: edit ? blog?.slug : "",
    img: edit ? blog?.img : "",
    content: edit ? blog?.content : "",
    category: edit ? blog?.category : "",
    tags: edit ? blog?.tags : [],
    postContent: edit ? blog?.postContent : [],
  };

  const formValidation = Yup.object().shape({
    title: Yup.string()
      .required("Title title is required")
      .min(10, "Blogs title must have at least 4 character")
      .max(80, "Blogs title must have at most 80 characters "),
    slug: Yup.string(),
    img: Yup.string().notRequired(),
    content: Yup.string()
      .required("Content is required")
      .min(10, "Content must be at least 10 characters"),
    category: Yup.object().nullable(true),
    postContent: Yup.object().shape({
      img: Yup.string().notRequired().nullable(),
      content: Yup.string().required(),
    }),
  });

  const loadCategoryList = async (search, loadOptions, { limit, offset }) => {
    const { data } = await axiosInstance(
      `/api/v1/category-app/category?search=${search}&offset=${offset}&limit=${limit}`
    );
    return {
      options: data?.results,
      hasMore: false,
      additional: {
        offset: limit,
        limit: limit + 10,
      },
    };
  };

  const loadTagsList = async (search, loadOptions, { limit, offset }) => {
    const { data } = await axiosInstance(
      `/api/v1/tags-app/tags?search=${search}&offset=${offset}&limit=${limit}`
    );
    return {
      options: data?.results,
      hasMore: false,
      additional: {
        offset: limit,
        limit: limit + 10,
      },
    };
  };

  const handleChange = async (e) => {
    if (edit && e.target.value !== blog?.title) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantCategoryData(e);
        result
          ? errorFunction("Category with this title already exists ") ||
            setLock(true)
          : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantCategoryData(e);
      result
        ? errorFunction("Blogs with this title already exists ") ||
          setLock(true)
        : setLock(false);
    }
  };

  const handlePostModal = () => {
    showPostModel === true ? setShowPostModel(false) : setShowPostModel(true);
  };

  const handleSubmit = (values) => {
    // console.log(values);
    // dispatch()
    // const { title, slug, content, parent, history } = values;
    // setLock(true);
    // if (edit) {
    //   const id = category.id;
    //   dispatch(updateCategory(id, values));
    // } else {
    //   dispatch(addCategory(values));
    // }
    // setLock(false);
    // setShowModal(false);
  };

  const onSubmit = (values) => {
    let { title, slug, img, categoryId, tags, content, history } = values;
    posts.forEach((element) => {
      values["postContent"].push(element);
    });
    console.log("submitted values", values);
    setLock(true);
    if (edit) {
      const id = blog.id;
      dispatch(updateBlog(id, values));
    } else {
      dispatch(createBlog(values));
    }
    setLock(false);
    setShowModal(false);
  };
  const handleClose = () => {
    dispatch(clearAllDataAction());
    setShowModal(false);
  };

  return (
    <>
      {showPostModel ? (
        <PostsModal
          showPostModel={showPostModel}
          setShowPostModel={setShowPostModel}
        />
      ) : (
        <div tabIndex="-1" className="flex justify-center py-40">
          <div className="relative p-0 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Product
                </h3>
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
             rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={(e) => handleClose()}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293
                4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10
                 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={initialState}
                validationSchema={formValidation}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="title"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Title
                          </label>
                          <Field
                            type="text"
                            name="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type blogs title"
                            required=""
                            onChange={(e) => {
                              formik.setFieldValue("title", e.target.value);
                              handleChange(e);
                            }}
                          />
                          <ErrorMessage name="title" component={TextError} />
                        </div>
                        <div>
                          <label
                            htmlFor="slug"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Slug
                          </label>
                          <Field
                            type="text"
                            name="slug"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                             rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Blog slug identifier"
                            required=""
                            onChange={(e) => {
                              formik.setFieldValue("slug", e.target.value);
                            }}
                          />
                          <ErrorMessage name="slug" component={TextError} />
                        </div>
                        <div>
                          <label
                            htmlFor="img"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Image
                          </label>
                          <Field
                            type="file"
                            name="img"
                            value={""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required={true}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              formik.setFieldValue("img", file);
                            }}
                          />
                          <ErrorMessage name="img" component={TextError} />
                        </div>
                        <div>
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Category
                          </label>
                          <AsyncPaginate
                            value={formik.values.category}
                            isClearable="true"
                            isSearchable="true"
                            name="category"
                            inputId="input"
                            getOptionLabel={(option) => `${option.title}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              formik.setFieldValue("category", selected);
                            }}
                            loadOptions={loadCategoryList}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                          />
                          <ErrorMessage name="category" component={TextError} />
                        </div>
                        <div>
                          <label
                            htmlFor="tags"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Tags
                          </label>
                          <AsyncPaginate
                            value={formik.values.tags}
                            isClearable="true"
                            isSearchable="true"
                            name="tags"
                            inputId="input"
                            getOptionLabel={(option) => `${option.title}`}
                            getOptionValue={(option) => `${option?.id}`}
                            onChange={(selected) => {
                              formik.setFieldValue("tags", selected);
                            }}
                            loadOptions={loadTagsList}
                            additional={{
                              offset: 0,
                              limit: 10,
                            }}
                            isMulti="true"
                          />
                          <ErrorMessage name="tags" component={TextError} />
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Content
                          </label>
                          <textarea
                            id="description"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Write blogs main content here"
                            onChange={(e) => {
                              formik.setFieldValue("content", e.target.value);
                            }}
                          ></textarea>
                          <ErrorMessage name="content" component={TextError} />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={(e) => setShowPostModel(true)}
                          className="text-white inline-flex items-center bg-primary-700 mt-10
                     hover:bg-primary-800 focus:ring-4 focus:outline-none
                      focus:ring-primary-300 font-medium rounded-lg text-sm px-5
                       py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                        dark:focus:ring-primary-800"
                        >
                          <svg
                            className="mr-1 -ml-1 w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Post Content
                        </button>

                        <button
                          type="submit"
                          onClick={(e) => onSubmit(formik.values)}
                          className="text-white inline-flex mt-10
                    items-center bg-primary-700 hover:bg-primary-800
                     focus:ring-4 focus:outline-none focus:ring-primary-300 
                     font-medium rounded-lg text-sm px-5 py-2.5 text-center
                      dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          <svg
                            className="mr-1 -ml-1 w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Submit Blog
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
