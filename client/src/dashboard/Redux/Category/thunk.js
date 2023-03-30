import {
  errorFunction,
  successFunction,
} from "../../../components/Alert/Alert";
import * as action from "./action";
import * as API from "./api";

export const listCategories = (offset, limit) => async (dispatch) => {
  try {
    dispatch(action.loadingCategory);
    const { data } = await API.categoryList(offset, limit);
  } catch (error) {
    errorFunction(error.response.data.msg);
  }
};

export const getPageCategories =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingCategoryAction());
      const { data } = await API.getPageCategories(number, postsPerPage);
      dispatch(action.getCategoriesSuccessAction(data));
    } catch (error) {
      dispatch(action.getCategoriesFailAction(error));
    }
  };

export const addCategory =
  ({ title, slug, content, parent }, currentPage) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingCategory);
      const body = { title, slug, content, parent };
      const { data } = await API.addCategory(body);

      successFunction(`Category Added Successfully`);
      dispatch(action.categorySucessAction(data));
      dispatch(getPageCategories({ number: currentPage, postsPerPage: 10 }));
    } catch (error) {
      errorFunction(error.response.data.msg);
      dispatch(action.categoryFailAction(error));
    }
  };

export const updateCategory =
  (id, { title, slug, content, parent }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingCategory);
      let body;
      if (parent) {
        body = { title, slug, content, parent };
      } else {
        body = { title, slug, content };
      }
      const { data } = await API.updateCategory(id, body);

      successFunction(`Category Updated Successfully`);
      dispatch(action.updateCategorySucessAction({ ...data }));
    } catch (error) {
      errorFunction(error.response.data.msg);
      dispatch(action.categoryFailAction(error));
    }
  };
