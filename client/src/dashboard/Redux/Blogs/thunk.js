import * as API from "./api";
import * as action from "./action";
import {
  errorFunction,
  successFunction,
} from "../../../components/Alert/Alert";
//get  Blogs
export const getBlog = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getBlog(postsPerPage);
    dispatch(action.getBlogsSuccessAction(data));
  } catch (error) {
    dispatch(action.getBlogsFailAction(error));
  }
};
// get all Blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllBlogs();
    dispatch(action.getAllBlogsSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllBlogsFailAction(error));
  }
};
//get previous page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(action.getBlogsSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllBlogsFailAction(error));
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(`${next}`);
    dispatch(action.getBlogsSuccessAction(data));
  } catch (error) {
    dispatch(action.getBlogsFailAction(error));
  }
};
//get particular page
export const getPageBlogs =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getPageBlogs(number, postsPerPage);
      dispatch(action.getBlogsSuccessAction(data));
    } catch (error) {
      dispatch(action.getBlogsFailAction(error));
    }
  };
//create  Blogs
export const createBlog =
  ({ title, slug, img, content, category, tags, postContent }, currentPage) =>
  async (dispatch) => {
    try {
      const body = new FormData();
      body.append("title", title);
      body.append("slug", slug);
      if (img) {
        body.append("img", img);
      }
      body.append("content", content);
      body.append("category", category?.id);

      tags.forEach((tag, i) => {
        body.append(`tags[${i}][id]`, tag.id);
      });
      (await postContent.length) > 0
        ? postContent.forEach((post, i) => {
            if (post?.img) {
              body.append("img", post.img);
              // body.append(`postContent[${i}][img]`, post.img);
            }
            body.append(`postContent[${i}][content]`, post.content);
          })
        : body.append(`postContent`, JSON.stringify([]));

      dispatch(action.loadingAction());
      const { data } = await API.createBlog(body);
      // for the case when it is created from other modal
      dispatch(action.createBlogsSuccessAction(data));
      successFunction("Blogs Created Successfully ");
      dispatch(getPageBlogs({ number: currentPage, postsPerPage: 10 }));
    } catch (error) {
      errorFunction(error.response.data.msg);
      dispatch(action.createBlogsFailAction(error));
    }
  };
// Delete  Blogs
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.deleteBlog(id);
    dispatch(action.deleteBlogsSuccessAction(id));
    dispatch(getBlog());
    successFunction(data);
  } catch (error) {
    dispatch(action.deleteBlogsFailAction(error));
    errorFunction(error);
  }
};

//update
export const updateBlog =
  (id, { title, slug, content }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        title,
        slug,
        content,
      });
      dispatch(action.loadingUpdateAction());
      const { data } = await API.updateBlog(id, body);
      await dispatch(action.updateBlogsSuccessAction(data));
      successFunction("Blogs updated Successfully ");
    } catch (error) {
      dispatch(action.updateBlogsFailAction(error));
      errorFunction("Failed to update Blogs");
    }
  };
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getBlogsSuccessAction(data));
  } catch (error) {
    errorFunction(error.response.data.msg);
    dispatch(action.getBlogsFailAction(error));
  }
};

export const getBlogSummary = (id) => async (dispatch) => {
  try {
    dispatch(action.loadingSummaryAction());
    const { data } = await API.getBlogSummary(id);
    dispatch(action.getBlogSummarySuccessAction(data));
  } catch (error) {
    errorFunction(error.response.data.msg);
    dispatch(action.getBlogSummaryFailAction(error));
  }
};

export const getRelatedBlogs = (id, categoryId) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getRelatedBlogs(id, categoryId);
    dispatch(action.getRelatedBlogsSuccessAction(data));
  } catch (error) {
    errorFunction(error.response.data.msg);
    dispatch(action.getRelatedBlogsFailAction(error));
  }
};

export const getBlogComments = (id) => async (dispatch) => {
  try {
    dispatch(action.loadingBlogCommentsAction());
    const { data } = await API.getBlogComments(id);
    dispatch(action.getBlogCommentsSuccessAction(data));
  } catch (error) {
    errorFunction(error.response.data.msg);
    dispatch(action.getBlogCommentsFailAction(error));
  }
};

export const postBlogComments = (postsId, content) => async (dispatch) => {
  try {
    const values = { postsId, Comment };
    const { data } = await API.postComment(values);
    dispatch(action.createBlogCommentsSuccessAction(data));
  } catch (error) {
    errorFunction(error.response.data.msg);
    dispatch(action.createBlogCommentsFailAction(error));
  }
};
