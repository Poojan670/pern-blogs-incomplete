import { errorFunction, successFunction } from "../../components/Alert/Alert";
import * as action from "./action";
import * as API from "./api";

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
  (id, title, slug, content, parent) => async (dispatch) => {
    try {
      dispatch(action.loadingCategory);
      const body = JSON.stringify({ title, slug, content, parent: parent?.id });
      const { data } = await API.addCategory(id, body);

      successFunction(`Category Updated Successfully`);
      dispatch(action.categorySucessAction({ ...data }));
    } catch (error) {
      errorFunction(error.response.data.msg);
      dispatch(action.categoryFailAction(error));
    }
  };
