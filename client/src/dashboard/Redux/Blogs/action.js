import { blogsConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: blogsConstants.LOADING_BLOGS,
});
export const loadingUpdateAction = () => ({
  type: blogsConstants.LOADING_UPDATED,
});
export const loadingSummaryAction = () => ({
  type: blogsConstants.LOADING_BLOG_SUMMARY,
});
export const loadingBlogCommentsAction = () => ({
  type: blogsConstants.LOADING_BLOG_COMMENTS,
});
export const getBlogsSuccessAction = (data) => ({
  type: blogsConstants.GET_BLOGS_SUCCESS,
  payload: data,
});

export const getBlogsFailAction = (error) => ({
  type: blogsConstants.GET_BLOGS_FAIL,
  payload: error,
});
export const getBlogSummarySuccessAction = (data) => ({
  type: blogsConstants.GET_BLOG_SUMMARY_SUCCESS,
  payload: data,
});

export const getBlogSummaryFailAction = (error) => ({
  type: blogsConstants.GET_BLOG_SUMMARY_FAIL,
  payload: error,
});
export const getRelatedBlogsSuccessAction = (data) => ({
  type: blogsConstants.GET_RELATED_BLOGS_SUCCESS,
  payload: data,
});

export const getRelatedBlogsFailAction = (error) => ({
  type: blogsConstants.GET_RELATED_BLOGS_FAIL,
  payload: error,
});

export const getAllBlogsSuccessAction = (data) => ({
  type: blogsConstants.GET_ALL_BLOGS_SUCCESS,
  payload: data,
});

export const getAllBlogsFailAction = (error) => ({
  type: blogsConstants.GET_ALL_BLOGS_FAIL,
  payload: error,
});

export const createBlogsSuccessAction = (data) => ({
  type: blogsConstants.CREATE_BLOGS_SUCCESS,
  payload: data,
});

export const createBlogsFailAction = (error) => ({
  type: blogsConstants.CREATE_BLOGS_FAIL,
  payload: error,
});

export const deleteBlogsSuccessAction = (data) => ({
  type: blogsConstants.DELETE_BLOGS_SUCCESS,
  payload: data,
});

export const deleteBlogsFailAction = (error) => ({
  type: blogsConstants.DELETE_BLOGS_FAIL,
  payload: error,
});

export const updateBlogsSuccessAction = (data) => ({
  type: blogsConstants.UPDATE_BLOGS_SUCCESS,
  payload: data,
});

export const updateBlogsFailAction = (error) => ({
  type: blogsConstants.UPDATE_BLOGS_FAIL,
  payload: error,
});

export const clearAllDataAction = () => ({
  type: blogsConstants.CLEAR_ALL_DATA,
  payload: [],
});

export const getBlogCommentsSuccessAction = (data) => ({
  type: blogsConstants.GET_BLOG_COMMENTS_SUCCESS,
  payload: data,
});

export const getBlogCommentsFailAction = (error) => ({
  type: blogsConstants.GET_BLOG_COMMENTS_FAIL,
  payload: error,
});

export const createBlogCommentsSuccessAction = (data) => ({
  type: blogsConstants.CREATE_BLOGS_COMMENTS_SUCCESS,
  payload: data,
});

export const createBlogCommentsFailAction = (error) => ({
  type: blogsConstants.CREATE_BLOGS_COMMENTS_FAIL,
  payload: error,
});
