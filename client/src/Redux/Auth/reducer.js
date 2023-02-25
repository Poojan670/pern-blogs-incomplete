import { authConstants } from "./constants";
import storage from "redux-persist/lib/storage";

const initialState = {
    isAuthenticated: false,
    loading: false,
    loading_reset: false,
    loading_reset_password: false,
    user_name: null,
    message: [],
    userid: null,
    permissions: [],
    authError: false,
    is_superuser: false,
    img: null,
    branches: [],
    groups: [],
    is_setup_done: false,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.LOADING:
            return {
                ...state,
                loading: true,
            };
        case authConstants.SET_BRANCH:
            return {
                ...state,
                branch: action.payload,
            };
        case authConstants.LOADING_RESET:
            return { ...state, loading_reset: true };
        case authConstants.LOADING_RESET_PASSWORD:
            return { ...state, loading_reset_password: true };
        case authConstants.LOGIN_SUCCESS:
            storage.removeItem("persist:root");
            localStorage.setItem("accessToken", action.payload.tokens.access);
            localStorage.setItem("refreshToken", action.payload.tokens.refresh);

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user_name: action.payload.user_name,
                userid: action.payload.id,
                authError: false,
                is_superuser: action.payload.is_superuser,
                permissions: action.payload.permissions,
                groups: action.payload.groups,
                img: action.payload.photo,
                is_setup_done: action.payload.is_setup_done,
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
                user_name: "",
                userid: null,
                permissions: [],
                groups: [],
                authError: false,
                is_superuser: false,
                groups: [],
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
                permissions: [],
                user_name: "",
                userid: null,
                authError: true,
                is_superuser: false,
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
        case authConstants.GET_ALL_BRANCHES_SUCCESS:
            return {
                ...state,
                branches: action.payload,
            };
        case authConstants.GET_ALL_BRANCHES_FAIL:
            return {
                ...state,
                branches: [],
            };
        case authConstants.CHECK_SETUP_COMPLETE_SUCCESS:
            return { ...state, is_setup_done: action.payload.is_setup_done };
        default:
            return state;
    }
};
export default authReducer;
