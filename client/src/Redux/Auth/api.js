import axiosInstance from "../../utils/axios";

//for login
export const login = (body) =>
    axiosInstance.post(`api/v1/user-app/login`, body);
//for logout
export const logout = (body) =>
    axiosInstance.post(`api/v1/user-app/logout`, body);
//for reset password
export const resetPassword = (body) =>
    axiosInstance.post(`api/v1/user-app/password-reset/`, body);
export const confirmPassword = (body) =>
    axiosInstance.post(`api/v1/user-app/password-reset/confirm/`, body);
export const changePassword = (id, body) =>
    axiosInstance.patch(`api/v1/user-app/change-password/${id}`, body);
export const getAllBranches = () => axiosInstance.get(`api/v1/branches`);
export const checkSetupComplete = () =>
    axiosInstance.get(`api/v1/core-app/setup-info`);
