import * as API from "./api";
import * as action from "./action";
import {
  errorFunction,
  successFunction,
} from "../../../components/Alert/Alert";
//get  Posts
export const getPost = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPost(postsPerPage);
    dispatch(action.getPostsSuccessAction(data));
  } catch (error) {
    dispatch(action.getPostsFailAction(error));
  }
};
// get all Posts
export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllPosts();
    dispatch(action.getAllPostsSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllPostsFailAction(error));
  }
};
//get previous page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(action.getPostsSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllPostsFailAction(error));
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(`${next}`);
    dispatch(action.getPostsSuccessAction(data));
  } catch (error) {
    dispatch(action.getPostsFailAction(error));
  }
};
//get particular page
export const getPagePosts =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getPagePosts(number, postsPerPage);
      dispatch(action.getPostsSuccessAction(data));
    } catch (error) {
      dispatch(action.getPostsFailAction(error));
    }
  };
//create  Posts
export const createPost =
  ({ img, content }, currentPage) =>
  async (dispatch) => {
    try {
      const body = { img, content };
      console.log(body, "this is body");
      dispatch(action.loadingAction());
      // const { data } = await API.createPost(body);
      // for the case when it is created from other modal
      dispatch(action.createPostsSuccessAction(body));
      successFunction("Posts Created Successfully ");
      // dispatch(getPagePosts({ number: currentPage, postsPerPage: 10 }));
    } catch (error) {
      dispatch(action.createPostsFailAction(error));
      errorFunction("Failed to create Posts");
    }
  };
// Delete  Posts
export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    // const { data } = await API.deletePost(id);
    dispatch(action.deletePostsSuccessAction(id));
    dispatch(getPost());
    // successFunction(data);
  } catch (error) {
    dispatch(action.deletePostsFailAction(error));
    errorFunction(error);
  }
};

//update
export const updatePost =
  (id, { title, slug, content }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        title,
        slug,
        content,
      });
      dispatch(action.loadingUpdateAction());
      // const { data } = await API.updatePost(id, body);
      await dispatch(action.updatePostsSuccessAction(body));
      successFunction("Posts updated Successfully ");
    } catch (error) {
      dispatch(action.updatePostsFailAction(error));
      errorFunction("Failed to update Posts");
    }
  };
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getPostsSuccessAction(data));
  } catch (error) {
    dispatch(action.getPostsFailAction(error));
  }
};
