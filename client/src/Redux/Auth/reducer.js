import { authConstants } from "./constants";
import storage from "redux-persist/lib/storage";

const initialState = {
  isAuthenticated: false,
  loading: false,
  loading_reset: false,
  loading_reset_password: false,
  loading_register: false,
  loading_verify: false,
  loading_resend_token: false,
  userName: null,
  message: [],
  userid: null,
  authError: false,
  role: "USER",
  img: null,
  email: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOADING:
      return {
        ...state,
        loading: true,
      };
    case authConstants.LOADING_RESET:
      return { ...state, loading_reset: true };
    case authConstants.LOADING_RESET_PASSWORD:
      return { ...state, loading_reset_password: true };
    case authConstants.LOADING_REGISTER:
      return { ...state, loading_register: true };
    case authConstants.LOADING_VERIFY:
      return { ...state, loading_verify: true };
    case authConstants.LOADING_RESEND_TOKEN:
      return { ...state, loading_resend_token: true };
    case authConstants.LOGIN_SUCCESS:
      storage.removeItem("persist:root");
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("userName", action.payload.userName);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userName: action.payload.userName,
        userid: action.payload.id,
        authError: false,
        role: action.payload.role,
        img: action.payload.img,
      };
    case authConstants.LOGIN_FAIL:
      return { ...state, isAuthenticated: false, loading: false, img: null };
    case authConstants.LOGOUT_SUCCESS:
      storage.removeItem("persist:root");
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        username: "",
        userid: null,
        authError: false,
        role: "USER",
        img: null,
      };
    case authConstants.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        authError: false,
      };
    case authConstants.AUTH_ERROR:
      storage.removeItem("persist:root");
      localStorage.clear();

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        userName: "",
        userid: null,
        authError: true,
        role: "",
        img: null,
      };
    case authConstants.RESET_SUCCESS:
      return {
        ...state,
        loading_reset_password: false,
        message: action.payload,
        authError: false,
      };
    case authConstants.RESET_FAIL:
      return {
        ...state,
        loading_reset_password: false,
        authError: false,
      };
    case authConstants.PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        loading_reset: false,
        authError: false,
      };
    case authConstants.PASSWORD_CONFIRM_FAIL:
      return {
        ...state,
        loading_reset: false,
        authError: false,
      };
    case authConstants.PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case authConstants.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading_reset: false,
        authError: false,
      };
    case authConstants.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
      };
    case authConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading_register: false,
        authError: false,
        email: action.payload.email,
      };
    case authConstants.RESEND_TOKEN_SUCCESS:
      return {
        ...state,
        loading_resend_token: false,
        authError: false,
      };
    case authConstants.REGISTER_FAIL:
      return { ...state, loading: false, loading_register: false };
    case authConstants.VERIFY_SUCCESS:
      return { ...state, loading_verify: false, authError: false };
    case authConstants.VERIFY_FAIL:
      return { ...state, loading_verify: false };
    case authConstants.RESEND_TOKEN_FAIL:
      return { ...state, loading_resend_token: false };
    default:
      return state;
  }
};
export default authReducer;
