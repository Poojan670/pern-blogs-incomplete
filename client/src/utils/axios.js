import axios from "axios";
import { errorFunction } from "../components/Alert/Alert";
import { authConstants } from "../Redux/Auth/constants";
import { store } from "../Redux/store";
//creating axios instance

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//interceptor
//request handling
axiosInstance.interceptors.request.use(
  (config) => {
    if (!window.navigator.onLine) {
      errorFunction(`No Internet Connection !!!`);
    } else if (window.navigator.onLine) {
      config.headers["Authorization"] = localStorage.getItem("accessToken")
        ? `${localStorage.getItem("accessToken")}`
        : null;
      config.baseURL =
        localStorage.getItem("url") !== null
          ? `http://${localStorage.getItem("url")}:5000`
          : process.env.REACT_APP_BASE_URL;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response handling
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    //refresh token
    const originalRequest = error.config;
    //when refresh token is also not valid
    if (
      error.response.status === 401 &&
      originalRequest.url === `api/v1/user-app/login/refresh`
    ) {
      store.dispatch({ type: authConstants.AUTH_ERROR });
      return errorFunction(`Refresh Token Expired. Please Login.`);
    }
    //accessing new access token from refresh token
    else if (
      error.response?.data.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      //call for refresh token

      originalRequest._retry = true;
      try {
        const body = JSON.stringify({
          refresh: localStorage.getItem("refreshToken"),
        });
        localStorage.removeItem("accessToken");
        const response = await axiosInstance.post(
          `api/v1/user-app/login/refresh`,
          body
        );
        if (response.status === 200) {
          localStorage.setItem("accessToken", response?.data.access);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response?.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        store.dispatch({
          type: authConstants.AUTH_ERROR,
        });
      }
    }

    //server down
    else if (error.message === "Network Error") {
      errorFunction("Internal Server Error. Contact IT manager !!!");
    } else if (error.response?.status === 500) {
      errorFunction("Internal Server Error. Contact IT manager !!!");
    } else if (error.response?.status === 403) {
      errorFunction("Permission Denied. Contact IT manager !!!");
    } else if (error.response?.status === 404) {
      errorFunction("Page Not Found !!!!!");
    }
    //unauthorized user
    else if (
      error.response?.status === 401 ||
      error.message === "Invalid token specified"
    ) {
      store.dispatch({ type: authConstants.AUTH_ERROR });
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
