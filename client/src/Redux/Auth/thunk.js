import { errorFunction, successFunction } from "../../components/Alert/Alert";
import * as action from "./action";
import * as API from "./api";
import { authConstants } from "./constants";
//login
export const login = (username, password, history) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = { username, password };
    const { data } = await API.login(body);

    //for storing the states when login success on the basis of which we can change the route of page.
    successFunction(`Welcome ${username}`);
    dispatch(action.loginSuccessAction({ ...data }));
    history.push("/dashboard");
  } catch (error) {
    errorFunction(error.response.data.msg);
    dispatch(action.loginFailAction(error));
  }
};

//register
export const register =
  (email, username, password, confirmPassword, history) => async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const body = { email, username, password, confirmPassword };
      const { data } = await API.register(body);
      //for storing the states when login success on the basis of which we can change the route of page.
      successFunction(
        `User Registered Successfully, Please verify your email:  ${email}`
      );
      dispatch(action.registerSuccessAction(data));
      history.push("/verify");
    } catch (error) {
      errorFunction(error.response?.data.msg);
      dispatch(action.registerFailAction(error));
    }
  };

export const verify = (token, history) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.verify(token);
    successFunction(`User Registered Successfully`);
    dispatch(action.verifySuccess(data));
    history.push("/login");
  } catch (error) {
    errorFunction(error.response?.data.msg);
    dispatch(action.verifyFail(error));
  }
};

//logout function
export const logout = (token) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = { refresh: token };
    await API.logout(body);
    dispatch(action.logoutSuccessAction());
    successFunction(`You have been successfully logged out.`);
  } catch (error) {
    dispatch(action.logoutFailAction(error));
    errorFunction("Failed to logout");
  }
};
//send email
export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(action.LoadingResetPasswordAction());
    const body = JSON.stringify({ email: email });
    const { data } = await API.resetPassword(body);
    dispatch(action.resetSuccessAction(data));
    successFunction(`Email send successfully `);
  } catch (error) {
    dispatch(action.resetFailAction());
    errorFunction(
      `There is no active user associated with this e-mail address  || the password can not be changed `
    );
  }
};
export const confirmPassword =
  (password, confirm_password, token, history) => async (dispatch) => {
    try {
      dispatch(action.loadingResetAction());
      const body = JSON.stringify({ token, password, confirm_password });
      const { data } = await API.confirmPassword(body);
      dispatch(action.confirmSuccessAction(data));
      successFunction(`Password has been reset successfully `);
      dispatch({ type: authConstants.RESET_SUCCESS, payload: [] });
      history.push("/");
    } catch (error) {
      dispatch(action.confirmFailAction());
      errorFunction(`Failed to reset Password`);
    }
  };

export const changePassword =
  (id, password, old_password, confirm_password, history) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingResetAction());
      const body = JSON.stringify({ password, old_password, confirm_password });
      const response = await API.changePassword(id, body);
      dispatch(action.changePasswordSuccessAction(response));
      successFunction(`Password changed successfully `);
      history.push("/");
    } catch (error) {
      dispatch(action.changePasswordFailAction());
      errorFunction("Oops! Something went wrong. Please try again later.");
    }
  };
