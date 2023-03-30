import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextError from "../../TextError/TextError";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { checkRedundantCategoryData } from "../../utils/RedundantData/checkRedundantCategoryData";
import { errorFunction } from "../../components/Alert/Alert";
import { createPost, updatePost } from "../Redux/Posts/thunk";
import { clearAllDataAction } from "../Redux/Posts/action";

const Posts = ({ showPostModel, setShowPostModel }) => {
  const { post, edit, posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  //state for disabling the submit button
  const [lock, setLock] = useState(false);

  const initialState = {
    img: edit ? post?.img : "",
    content: edit ? post?.content : "",
  };

  const formValidation = Yup.object().shape({
    img: Yup.mixed().nullable(),
    content: Yup.string()
      .required("Content is required")
      .min(5, "Content must be at least 5 characters"),
  });

  const handleChange = async (e) => {
    if (edit && e.target.value !== post?.title) {
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
        ? errorFunction("Category with this title already exists ") ||
          setLock(true)
        : setLock(false);
    }
  };

  const onSubmit = (values) => {
    const { img, content } = values;
    setLock(true);
    if (edit) {
      const id = post.id;
      dispatch(updatePost(id, values));
    } else {
      dispatch(createPost(values));
    }
    setLock(false);
    // setShowPostModel(false);
  };
  const handleClose = () => {
    dispatch(clearAllDataAction());
    setShowPostModel(false);
  };

  return (
    <div className="flex justify-center px-20 py-20">
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full">
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
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Add Category
            </h3>

            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              validationSchema={formValidation}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form
                    className="space-y-6"
                    action="client/src/dashboard/Modal#"
                  >
                    <div>
                      <label
                        htmlFor="img"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Slug
                      </label>
                      <Field
                        type="file"
                        name="img"
                        placeholder="Slug identifier"
                        value={""}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                         dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          formik.setFieldValue("img", file);
                        }}
                      />
                      <ErrorMessage name="img" component={TextError} />
                    </div>
                    <div>
                      <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content
                      </label>
                      <textarea
                        type="text"
                        name="content"
                        placeholder="description"
                        className="bg-gray-50 resize border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[5rem] dark:bg-gray-600
                         dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onChange={(e) => {
                          formik.setFieldValue("content", e.target.value);
                        }}
                      />
                      <ErrorMessage name="content" component={TextError} />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                       py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {edit ? "Update" : "Submit"}
                    </button>
                  </Form>
                );
              }}
            </Formik>
            {posts?.length > 0 ? (
              <div className="mt-5">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        SN
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Img
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Content
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((post, i) => {
                      const { img, content } = post;
                      return (
                        <tr key={i + 1}>
                          <td className="px-6 py-3">{i + 1}</td>
                          <td className="px-6 py-4">
                            <img src={img} alt="image" width="50" height="50" />
                          </td>
                          <td className="px-6 py-4">{content}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
