import { postsConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: postsConstants.LOADING_POSTS,
});
export const loadingUpdateAction = () => ({
  type: postsConstants.LOADING_UPDATED,
});
export const getPostsSuccessAction = (data) => ({
  type: postsConstants.GET_POSTS_SUCCESS,
  payload: data,
});

export const getPostsFailAction = (error) => ({
  type: postsConstants.GET_POSTS_FAIL,
  payload: error,
});

export const getAllPostsSuccessAction = (data) => ({
  type: postsConstants.GET_ALL_POSTS_SUCCESS,
  payload: data,
});

export const getAllPostsFailAction = (error) => ({
  type: postsConstants.GET_ALL_POSTS_FAIL,
  payload: error,
});

export const createPostsSuccessAction = (data) => ({
  type: postsConstants.CREATE_POSTS_SUCCESS,
  payload: data,
});

export const createPostsFailAction = (error) => ({
  type: postsConstants.CREATE_POSTS_FAIL,
  payload: error,
});

export const deletePostsSuccessAction = (data) => ({
  type: postsConstants.DELETE_POSTS_SUCCESS,
  payload: data,
});

export const deletePostsFailAction = (error) => ({
  type: postsConstants.DELETE_POSTS_FAIL,
  payload: error,
});

export const updatePostsSuccessAction = (data) => ({
  type: postsConstants.UPDATE_POSTS_SUCCESS,
  payload: data,
});

export const updatePostsFailAction = (error) => ({
  type: postsConstants.UPDATE_POSTS_FAIL,
  payload: error,
});

export const clearAllDataAction = () => ({
  type: postsConstants.CLEAR_ALL_DATA,
  payload: [],
});
