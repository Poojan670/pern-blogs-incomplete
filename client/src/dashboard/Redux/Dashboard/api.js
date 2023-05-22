import axiosInstance from "../../../utils/axios";

export const getTopBloggers = () =>
  axiosInstance.get(`api/v1/dashboard-app/top-bloggers-list`);

export const getMyTopBlogStats = (id) =>
  axiosInstance.get(`api/v1/dashboard-app/my-top-bloggers-list/${id}`);
