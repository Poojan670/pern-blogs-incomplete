import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextError from "../../TextError/TextError";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { checkRedundantTagsData } from "../../utils/RedundantData/checkRedundantTagsData.";
import { errorFunction } from "../../components/Alert/Alert";
import { createTag, updateTag } from "../Redux/Tags/thunk";
import { clearAllDataAction } from "../Redux/Tags/action";

const Tags = ({ showModel, setShowModal }) => {
  const { tag, edit } = useSelector((state) => state.tag);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(false);

  const initialState = {
    title: edit ? tag?.title : "",
    slug: edit ? tag?.slug : "",
    content: edit ? tag?.content : "",
  };

  const formValidation = Yup.object().shape({
    title: Yup.string()
      .required("Tags title is required")
      .min(5, "Tags title must have at least 4 character")
      .max(80, "Tags title must have at least 80 characters "),
    slug: Yup.string(),
    content: Yup.string()
      .required("Content is required")
      .min(10, "Content must be at least 10 characters"),
  });

  const handleChange = async (e) => {
    if (edit && e.target.value !== tag?.title) {
      if (e.target.value.trim() && e.target.value !== "") {
        const result = await checkRedundantTagsData(e);
        result
          ? errorFunction("Tag with this title already exists ") ||
            setLock(true)
          : setLock(false);
      }
    }
    if (!edit && e.target.value.trim() && e.target.value !== "") {
      const result = await checkRedundantTagsData(e);
      result
        ? errorFunction("Tag with this title already exists ") || setLock(true)
        : setLock(false);
    }
  };

  const onSubmit = (values) => {
    const { title, slug, content } = values;
    setLock(true);
    if (edit) {
      const id = tag.id;
      dispatch(updateTag(id, values));
    } else {
      dispatch(createTag(values));
    }
    setLock(false);
    setShowModal(false);
  };
  const handleClose = () => {
    dispatch(clearAllDataAction());
    setShowModal(false);
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
              Add Tags
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
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tags Title
                      </label>
                      <Field
                        type="text"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                        dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Education"
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
                        placeholder="Slug identifier"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
                         dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        onChange={(e) => {
                          formik.setFieldValue("slug", e.target.value);
                        }}
                      />
                      <ErrorMessage name="slug" component={TextError} />
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
