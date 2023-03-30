import { categoryConstants } from "./constants";
// actions
export const loadingCategory = () => ({
  type: categoryConstants.LOADING_CATEGORY,
});
export const loadingCategoryAction = () => ({
  type: categoryConstants.LOADING_CATEGORIES,
});
export const categorySucessAction = (data) => ({
  type: categoryConstants.ADD_CATEGORY_SUCCESS,
  payload: data,
});
export const categoryFailAction = (error) => ({
  type: categoryConstants.ADD_CATEGORY_FAIL,
  payload: error,
});
export const updateCategorySucessAction = (data) => ({
  type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
  payload: data,
});
export const updateCategoryFailAction = (error) => ({
  type: categoryConstants.UPDATE_CATEGORY_FAIL,
  payload: error,
});
export const clearAllDataAction = (data) => ({
  type: categoryConstants.CLEAR_ALL_DATA,
  payload: data,
});
export const getCategoriesSuccessAction = (data) => ({
  type: categoryConstants.GET_CATEGORIES_SUCCESS,
  payload: data,
});

export const getCategoriesFailAction = (error) => ({
  type: categoryConstants.GET_CATEGORIES_FAIL,
  payload: error,
});
