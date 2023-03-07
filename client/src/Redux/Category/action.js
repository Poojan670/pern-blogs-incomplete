import { categoryConstants } from "./constants";
// actions
export const loadingCategory = () => ({
  type: categoryConstants.LOADING_CATEGORY,
});
export const categorySucessAction = (data) => ({
  type: categoryConstants.ADD_CATEGORY_SUCCESS,
  payload: data,
});
export const categoryFailAction = (error) => ({
  type: categoryConstants.ADD_CATEGORY_FAIL,
  payload: error,
});
