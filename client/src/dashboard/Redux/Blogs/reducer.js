import { blogsConstants } from "./constants";

const initialState = {
  blogs: [],
  edit: false,
  blog: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loading_updated: false,
  loading_summary: false,
  loading_blog_comments: false,
  relatedBlogs: [],
  blogComments: [],
};
const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case blogsConstants.LOADING_BLOGS:
      return {
        ...state,
        loading: true,
      };
    case blogsConstants.LOADING_UPDATED:
      return {
        ...state,
        loading_updated: true,
        loading: false,
      };
    case blogsConstants.LOADING_BLOG_SUMMARY:
      return {
        ...state,
        loading_summary: true,
      };
    case blogsConstants.LOADING_BLOG_COMMENTS:
      return {
        ...state,
        loading_blog_comments: true,
      };
    case blogsConstants.GET_RELATED_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        relatedBlogs: action.payload.results,
      };
    case blogsConstants.GET_RELATED_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case blogsConstants.GET_BLOG_COMMENTS_SUCCESS:
      return {
        ...state,
        loading_blog_comments: false,
        blogComments: action.payload,
      };
    case blogsConstants.GET_BLOG_COMMENTS_SUCCESS:
      return {
        ...state,
        loading_blog_comments: false,
      };
    case blogsConstants.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload.results,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case blogsConstants.GET_BLOGS_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case blogsConstants.GET_ALL_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
        edit: false,
        count: null,
        next: null,
        previous: null,
        loading: false,
      };
    case blogsConstants.GET_ALL_BLOGS_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case blogsConstants.CREATE_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs],
        edit: false,
        loading: false,
      };
    case blogsConstants.CREATE_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case blogsConstants.CREATE_BLOGS_COMMENTS_SUCCESS:
      return {
        ...state,
        loading_blog_comments: false,
        blogComments: [action.payload, ...state.blogComments],
      };
    case blogsConstants.CREATE_BLOGS_COMMENTS_FAIL:
      return {
        ...state,
        loading_blog_comments: false,
      };
    case blogsConstants.GET_BLOG_SUMMARY_SUCCESS:
      return {
        ...state,
        blog: action.payload,
        loading_summary: false,
      };
    case blogsConstants.GET_BLOG_SUMMARY_FAIL:
      return {
        ...state,
        loading_summary: false,
      };
    case blogsConstants.DELETE_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
        loading: false,
      };

    case blogsConstants.DELETE_BLOGS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case blogsConstants.BLOGS_EDIT_SUCCESS:
      return {
        ...state,
        blog: state.blogs.find((blog) => blog.id === action.payload),
        edit: true,
        loading: false,
      };
    case blogsConstants.UPDATE_BLOGS_SUCCESS:
      let newTagCat = state.blogs.map((icat) =>
        icat.id === action.payload.id ? action.payload : icat
      );
      return {
        ...state,
        blogs: newTagCat,
        edit: false,
        loading_updated: false,
        blog: null,
      };
    case blogsConstants.UPDATE_BLOGS_FAIL:
      return {
        ...state,
        loading_updated: false,
        edit: false,
        blog: null,
      };
    case blogsConstants.CLEAR_EDIT_BLOGS:
      return {
        ...state,
        edit: false,
        loading: false,
        blog: null,
      };
    case blogsConstants.CLEAR_ALL_DATA:
      return {
        ...state,
        blog: null,
      };
    default:
      return state;
  }
};
export default blogsReducer;
