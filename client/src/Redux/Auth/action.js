import { authConstants } from "./constants";
// actions
export const loadingAction = () => ({
    type: authConstants.LOADING,
});
export const loadingResetAction = () => ({
    type: authConstants.LOADING_RESET,
});
export const LoadingResetPasswordAction = () => ({
    type: authConstants.LOADING_RESET_PASSWORD,
});

export const loginSuccessAction = (data) => ({
    type: authConstants.LOGIN_SUCCESS,
    payload: data,
});
export const loginFailAction = (error) => ({
    type: authConstants.LOGIN_FAIL,
    payload: error,
});
export const logoutSuccessAction = () => ({
    type: authConstants.LOGOUT_SUCCESS,
});
export const logoutFailAction = (error) => ({
    type: authConstants.LOGOUT_FAIL,
    payload: error,
});
export const resetSuccessAction = (data) => ({
    type: authConstants.RESET_SUCCESS,
    payload: data,
});
export const resetFailAction = (error) => ({
    type: authConstants.RESET_FAIL,
    payload: error,
});
export const confirmSuccessAction = () => ({
    type: authConstants.PASSWORD_CONFIRM_SUCCESS,
});
export const confirmFailAction = (error) => ({
    type: authConstants.PASSWORD_CONFIRM_FAIL,
    payload: error,
});
export const changePasswordSuccessAction = (response) => ({
    type: authConstants.PASSWORD_CHANGE_SUCCESS,
    payload: response,
});

export const changePasswordFailAction = (error) => ({
    type: authConstants.PASSWORD_CHANGE_FAIL,
    payload: error,
});
export const getAllBranchesSuccessAction = (data) => ({
    type: authConstants.GET_ALL_BRANCHES_SUCCESS,
    payload: data,
});
export const getAllBranchesFailAction = (error) => ({
    type: authConstants.GET_ALL_BRANCHES_FAIL,
    payload: error,
});
export const checkSetupCompleteSuccessAction = (data) => ({
    type: authConstants.CHECK_SETUP_COMPLETE_SUCCESS,
    payload: data,
});
export const checkSetupCompleteFailAction = () => ({});
