import axiosInstance from "../../utils/axios";

export const getPrevious = (previous) => axiosInstance.get(previous);
export const getNext = (next) => axiosInstance.get(next);

export const categoryList = (offset, limit) =>
  axiosInstance.get(
    `api/v1/category-app/category?offset=${offset}&limit=${limit}`
  );

export const addCategory = (body) =>
  axiosInstance.post(`api/v1/category-app/category`, body);

export const updateCategory = (id, body) =>
  axiosInstance.patch(`api/v1/category-app/category/${id}`, body);

export const getCategory = (id) =>
  axiosInstance.get(`api/v1/category-app/category/${id}`);

// checking the redundant data
export const checkRedundantData = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/category-app/category?title=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
