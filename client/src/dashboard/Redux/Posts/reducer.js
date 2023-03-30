import { postsConstants } from "./constants";

const initialState = {
  posts: [],
  edit: false,
  post: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loading_updated: false,
};
const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case postsConstants.LOADING_POSTS:
      return {
        ...state,
        loading: true,
      };
    case postsConstants.LOADING_UPDATED:
      return {
        ...state,
        loading_updated: true,
        loading: false,
      };
    case postsConstants.GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.results,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case postsConstants.GET_POSTS_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case postsConstants.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        edit: false,
        count: null,
        next: null,
        previous: null,
        loading: false,
      };
    case postsConstants.GET_ALL_POSTS_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case postsConstants.CREATE_POSTS_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        edit: false,
        loading: false,
      };
    case postsConstants.CREATE_POSTS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case postsConstants.DELETE_POSTS_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        loading: false,
      };

    case postsConstants.DELETE_POSTS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case postsConstants.POSTS_EDIT_SUCCESS:
      return {
        ...state,
        post: state.posts.find((post) => post.id === action.payload),
        edit: true,
        loading: false,
      };
    case postsConstants.UPDATE_POSTS_SUCCESS:
      let newTagCat = state.posts.map((icat) =>
        icat.id === action.payload.id ? action.payload : icat
      );
      return {
        ...state,
        posts: newTagCat,
        edit: false,
        loading_updated: false,
        post: null,
      };
    case postsConstants.UPDATE_POSTS_FAIL:
      return {
        ...state,
        loading_updated: false,
        edit: false,
        post: null,
      };
    case postsConstants.CLEAR_EDIT_POSTS:
      return {
        ...state,
        edit: false,
        loading: false,
        post: null,
      };
    case postsConstants.CLEAR_ALL_DATA:
      return {
        ...state,
        post: null,
      };
    default:
      return state;
  }
};
export default postsReducer;
