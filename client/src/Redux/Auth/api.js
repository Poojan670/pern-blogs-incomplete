import axiosInstance from "../../utils/axios";

//for login
export const login = (body) =>
  axiosInstance.post(`api/v1/user-app/login`, body);
//for register
export const register = (body) =>
  axiosInstance.post(`api/v1/user-app/register`, body, {
    "Content-Type": "multipart/form-data",
  });
// verify user
export const verify = (token) =>
  axiosInstance.get(`api/v1/user-app/verify/${token}`);
// resend token
export const reSendToken = (email) =>
  axiosInstance.get(`api/v1/user-app/resend/${email}`);
//for logout
export const logout = (body) =>
  axiosInstance.post(`api/v1/user-app/logout`, body);
//for reset password
export const resetPassword = (body) =>
  axiosInstance.post(`api/v1/user-app/password-reset/`, body);
export const confirmPassword = (body) =>
  axiosInstance.post(`api/v1/user-app/password-reset/confirm/`, body);
export const forgotPassword = (body) =>
  axiosInstance.post(`api/v1/user-app/password-reset/forgot/`, body);
export const changePassword = (id, body) =>
  axiosInstance.patch(`api/v1/user-app/change-password/${id}`, body);
// get user
export const user = () => axiosInstance.get(`api/v1/user-app/me`);
// user list
export const userList = (offset, limit) =>
  axiosInstance.get(
    `api/v1/user-app/users?offset=${offset}&limit=${limit}&ordering=-10`
  );
