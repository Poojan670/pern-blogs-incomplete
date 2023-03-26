import * as API from "./api";
import * as action from "./action";
import {
  errorFunction,
  successFunction,
} from "../../../components/Alert/Alert";
//get  Tags
export const getTag = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getTag(postsPerPage);
    dispatch(action.getTagsSuccessAction(data));
  } catch (error) {
    dispatch(action.getTagsFailAction(error));
  }
};
// get all Tags
export const getAllTags = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllTags();
    dispatch(action.getAllTagsSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllTagsFailAction(error));
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(action.getTagsSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllTagsFailAction(error));
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(`${next}`);
    dispatch(action.getTagsSuccessAction(data));
  } catch (error) {
    dispatch(action.getTagsFailAction(error));
  }
};
//get particular page
export const getPageTags =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getPageTags(number, postsPerPage);
      dispatch(action.getTagsSuccessAction(data));
    } catch (error) {
      dispatch(action.getTagsFailAction(error));
    }
  };
//create  Tags
export const createTag =
  ({ title, slug, content }, currentPage) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ title, slug, content });
      dispatch(action.loadingAction());
      const { data } = await API.createTag(body);
      // for the case when it is created from other modal
      dispatch(action.createTagsSuccessAction(data));
      successFunction("Tags Created Successfully ");
      dispatch(getPageTags({ number: currentPage, postsPerPage: 10 }));
    } catch (error) {
      dispatch(action.createTagsFailAction(error));
      errorFunction("Failed to create Tags");
    }
  };
// Delete  Tags
export const deleteTag = (id) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.deleteTag(id);
    dispatch(action.deleteTagsSuccessAction(id));
    dispatch(getTag());
    successFunction(data);
  } catch (error) {
    dispatch(action.deleteTagsFailAction(error));
    errorFunction(error);
  }
};

//update
export const updateTag =
  (id, { title, slug, content }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        title,
        slug,
        content,
      });
      dispatch(action.loadingUpdateAction());
      const { data } = await API.updateTag(id, body);
      await dispatch(action.updateTagsSuccessAction(data));
      successFunction("Tags updated Successfully ");
    } catch (error) {
      dispatch(action.updateTagsFailAction(error));
      errorFunction("Failed to update Tags");
    }
  };
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getTagsSuccessAction(data));
  } catch (error) {
    dispatch(action.getTagsFailAction(error));
  }
};
