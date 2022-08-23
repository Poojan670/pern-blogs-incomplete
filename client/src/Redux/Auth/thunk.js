import { errorFunction, successFunction } from "../../components/Alert/Alert";
import * as action from "./action";
import * as API from "./api";
import { authConstants } from "./constants";
//login
export const login = (user_name, password) => async (dispatch) => {
    try {
        dispatch(action.loadingAction());
        const body = { user_name, password };
        const { data } = await API.login(body);
        const permissions = data.permissions;
        const user_permissions = permissions?.map(
            (permission) => permission.code_name
        );

        //for storing the states when login success on the basis of which we can change the route of page.
        successFunction(`Welcome ${data.user_name}`);
        dispatch(
            action.loginSuccessAction({ ...data, permissions: user_permissions })
        );
    } catch (error) {
        errorFunction("Invalid Credentials");
        dispatch(action.loginFailAction(error));
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
export const getAllBranches = () => async (dispatch) => {
    try {
        const { data } = await API.getAllBranches();
        dispatch(action.getAllBranchesSuccessAction(data));
    } catch (error) {
        dispatch(action.getAllBranchesFailAction());
        errorFunction("Oops! Something went wrong. Please try again later.");
    }
};
export const checkSetupComplete = () => async (dispatch) => {
    try {
        const { data } = await API.checkSetupComplete();
        dispatch(action.checkSetupCompleteSuccessAction(data));
    } catch (error) {
        dispatch(action.checkSetupCompleteFailAction());
    }
};
