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
export const LoadingRegister = () => ({
  type: authConstants.LOADING_REGISTER,
});
export const loadingVerify = () => ({
  type: authConstants.LOADING_VERIFY,
});
export const lodingReSendToken = () => ({
  type: authConstants.LOADING_RESEND_TOKEN,
});
export const reSendTokenSucessAction = (data) => ({
  type: authConstants.RESEND_TOKEN_SUCCESS,
  payload: data,
});
export const reSendTokenFailAction = (error) => ({
  type: authConstants.RESEND_TOKEN_FAIL,
  payload: error,
});
export const loginSuccessAction = (data) => ({
  type: authConstants.LOGIN_SUCCESS,
  payload: data,
});
export const loginFailAction = (error) => ({
  type: authConstants.LOGIN_FAIL,
  payload: error,
});
export const registerSuccessAction = (data) => ({
  type: authConstants.REGISTER_SUCCESS,
  payload: data,
});
export const registerFailAction = (error) => ({
  type: authConstants.REGISTER_FAIL,
  payload: error,
});
export const verifySuccess = (data) => ({
  type: authConstants.VERIFY_SUCCESS,
  payload: data,
});
export const verifyFail = (error) => ({
  type: authConstants.VERIFY_FAIL,
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
export const forgotPasswordSuccessAction = () => ({
  type: authConstants.FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFailAction = (error) => ({
  type: authConstants.FORGOT_PASSWORD_SUCCESS,
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
