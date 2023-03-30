import axiosInstance from "../../../utils/axios";

//obtaining the paginated data
export const getTag = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/tags-app/tags?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all data
export const getAllTags = () =>
  axiosInstance.get(`api/v1/tags-app/tags?ordering=-id&limit=10`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageTags = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/tags-app/tags?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createTag = (body) =>
  axiosInstance.post(`api/v1/tags-app/tags`, body);

//deleting function
export const deleteTag = (id) =>
  axiosInstance.delete(`api/v1/tags-app/tags/${id}`);

//update function
export const updateTag = (id, body) =>
  axiosInstance.patch(`api/v1/tags-app/tags/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/tags-app/tags?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantTagsTitle = (e, cancelToken) =>
  axiosInstance.get(`api/v1/tags-app/tags?title=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });
