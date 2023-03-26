import { tagsConstants } from "./constants";

const initialState = {
  tags: [],
  edit: false,
  tag: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loading_updated: false,
};
const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case tagsConstants.LOADING_TAGS:
      return {
        ...state,
        loading: true,
      };
    case tagsConstants.LOADING_UPDATED:
      return {
        ...state,
        loading_updated: true,
        loading: false,
      };
    case tagsConstants.GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload.results,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case tagsConstants.GET_TAGS_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case tagsConstants.GET_ALL_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload,
        edit: false,
        count: null,
        next: null,
        previous: null,
        loading: false,
      };
    case tagsConstants.GET_ALL_TAGS_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case tagsConstants.CREATE_TAGS_SUCCESS:
      return {
        ...state,
        tags: [action.payload, ...state.tags],
        edit: false,
        loading: false,
      };
    case tagsConstants.CREATE_TAGS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case tagsConstants.DELETE_TAGS_SUCCESS:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
        loading: false,
      };

    case tagsConstants.DELETE_TAGS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case tagsConstants.TAGS_EDIT_SUCCESS:
      return {
        ...state,
        tag: state.tags.find((tag) => tag.id === action.payload),
        edit: true,
        loading: false,
      };
    case tagsConstants.UPDATE_TAGS_SUCCESS:
      let newTagCat = state.tags.map((icat) =>
        icat.id === action.payload.id ? action.payload : icat
      );
      return {
        ...state,
        tags: newTagCat,
        edit: false,
        loading_updated: false,
        tag: null,
      };
    case tagsConstants.UPDATE_TAGS_FAIL:
      return {
        ...state,
        loading_updated: false,
        edit: false,
        tag: null,
      };
    case tagsConstants.CLEAR_EDIT_TAGS:
      return {
        ...state,
        edit: false,
        loading: false,
        tag: null,
      };
    case tagsConstants.CLEAR_ALL_DATA:
      return {
        ...state,
        tag: null,
      };
    default:
      return state;
  }
};
export default tagsReducer;
