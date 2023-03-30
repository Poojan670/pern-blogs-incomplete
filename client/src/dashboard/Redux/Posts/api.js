import axiosInstance from "../../../utils/axios";

//obtaining the paginated data
export const getPost = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/posts-app/posts?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all data
export const getAllPosts = () =>
  axiosInstance.get(`api/v1/posts-app/posts?ordering=-id&limit=10`);

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPagePosts = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/posts-app/posts?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createPost = (body) =>
  axiosInstance.post(`api/v1/posts-app/posts`, body);

//deleting function
export const deletePost = (id) =>
  axiosInstance.delete(`api/v1/posts-app/posts/${id}`);

//update function
export const updatePost = (id, body) =>
  axiosInstance.patch(`api/v1/posts-app/posts/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/posts-app/posts?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantDataCode = (e, cancelToken) =>
  axiosInstance.get(`api/v1/posts-app/posts?code=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });
export const checkRedundantDataName = (e, cancelToken) =>
  axiosInstance.get(`api/v1/posts-app/posts?name=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });
