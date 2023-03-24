import { errorFunction, successFunction } from "../../components/Alert/Alert";
import * as action from "./action";
import * as API from "./api";

export const listCategories = (page, limit) => async (dispatch) => {
  try {
    dispatch(action.loadingCategory);
    const { data } = await API.categoryList(page, limit);
  } catch (error) {
    errorFunction(error.response.data.msg);
  }
};

export const addCategory =
  ({ title, slug, content, parent, history }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingCategory);
      const body = { title, slug, content, parent };
      const { data } = await API.addCategory(body);

      successFunction(`Category Added Successfully`);
      dispatch(action.categorySucessAction(data));
      history.push("/blogs-category");
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
