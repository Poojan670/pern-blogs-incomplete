import { tagsConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: tagsConstants.LOADING_TAGS,
});
export const loadingUpdateAction = () => ({
  type: tagsConstants.LOADING_UPDATED,
});
export const getTagsSuccessAction = (data) => ({
  type: tagsConstants.GET_TAGS_SUCCESS,
  payload: data,
});

export const getTagsFailAction = (error) => ({
  type: tagsConstants.GET_TAGS_FAIL,
  payload: error,
});

export const getAllTagsSuccessAction = (data) => ({
  type: tagsConstants.GET_ALL_TAGS_SUCCESS,
  payload: data,
});

export const getAllTagsFailAction = (error) => ({
  type: tagsConstants.GET_ALL_TAGS_FAIL,
  payload: error,
});

export const createTagsSuccessAction = (data) => ({
  type: tagsConstants.CREATE_TAGS_SUCCESS,
  payload: data,
});

export const createTagsFailAction = (error) => ({
  type: tagsConstants.CREATE_TAGS_FAIL,
  payload: error,
});

export const deleteTagsSuccessAction = (data) => ({
  type: tagsConstants.DELETE_TAGS_SUCCESS,
  payload: data,
});

export const deleteTagsFailAction = (error) => ({
  type: tagsConstants.DELETE_TAGS_FAIL,
  payload: error,
});

export const updateTagsSuccessAction = (data) => ({
  type: tagsConstants.UPDATE_TAGS_SUCCESS,
  payload: data,
});

export const updateTagsFailAction = (error) => ({
  type: tagsConstants.UPDATE_TAGS_FAIL,
  payload: error,
});

export const clearAllDataAction = () => ({
  type: tagsConstants.CLEAR_ALL_DATA,
  payload: [],
});
