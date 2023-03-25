import { categoryConstants } from "./constants";
import storage from "redux-persist/lib/storage";

const initialState = {
  categories: [],
  category: null,
  loading_category: false,
  message: [],
  edit: false,
  count: null,
  next: null,
  previous: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.LOADING_CATEGORY:
      return {
        ...state,
        loading_category: true,
      };
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading_category: false,
        edit: false,
        category: action.payload,
      };
    case categoryConstants.ADD_CATEGORY_FAIL:
      return {
        ...state,
        loading_category: false,
        edit: false,
        message: action.payload,
      };
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading_category: false,
        edit: false,
        categories: state.categories.filter((cat, i) =>
          cat?.id === action.payload?.id ? action.payload : cat
        ),
      };
    case categoryConstants.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        loading_category: false,
        edit: false,
        message: action.payload,
      };
    case categoryConstants.EDIT_CATEGORY:
      return {
        ...state,
        loading_category: false,
        edit: true,
        category: action.payload,
      };
    case categoryConstants.CLEAR_ALL_DATA:
      console.log(state, "this is state");
      return {
        ...state,
        loading_category: false,
        edit: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
