import axios from "axios";
import axiosInstance from "../../../utils/axios";

//obtaining the paginated data
export const getBlog = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/blogs-app/blogs?offset=0&limit=${postsPerPage}&ordering=-id`
  );

export const getBlogSummary = (id) =>
  axiosInstance.get(`api/v1/posts-app/posts-summary/${id}`);

//obtaining all data
export const getAllBlogs = () =>
  axiosInstance.get(`api/v1/posts-app/posts?ordering=-id&limit=10`);

export const getAllMyBlogs = (id) =>
  axiosInstance.get(
    `api/v1/posts-app/posts?ordering=-id&limit=10&createdBy=${id}`
  );

//obtaining all popular blogs from last week
export const getTrendingPosts = () =>
  axiosInstance.get(`api/v1/posts-app/trending-posts?ordering=-views&limit=10`);

export const getPopularBlogs = () =>
  axiosInstance.get(`api/v1/posts-app/posts?ordering=-views&limit=10`);

export const getRelatedBlogs = (id, categoryId) =>
  axiosInstance.get(
    `api/v1/posts-app/related-posts/${id}/${categoryId}?ordering=id&limit=5`
  );

//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageBlogs = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/posts-app/posts?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createBlog = (body) =>
  axiosInstance.post(`api/v1/posts-app/posts`, body, {
    "Content-Type": "multipart/form-data",
  });

//deleting function
export const deleteBlog = (id) =>
  axiosInstance.delete(`api/v1/blogs-app/blogs/${id}`);

//update function
export const updateBlog = (id, body) =>
  axiosInstance.patch(`api/v1/blogs-app/blogs/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/blogs-app/blogs?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantDataCode = (e, cancelToken) =>
  axiosInstance.get(`api/v1/blogs-app/blogs?code=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });
export const checkRedundantDataName = (e, cancelToken) =>
  axiosInstance.get(`api/v1/blogs-app/blogs?name=${e.target.value}`, {
    cancelToken: cancelToken.token,
  });

// Create Comments
export const postComment = (body) =>
  axiosInstance.post(`api/v1/comments-app/comments`);

export const getBlogComments = (id) =>
  axiosInstance.get(`api/v1/comments-app/blog-comments/${id}`);
