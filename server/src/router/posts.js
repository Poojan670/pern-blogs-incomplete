const express = require("express");
require("express-async-errors");
const router = express.Router();
const posts = require("../controllers/posts");
const auth = require("../../middleware/auth");
const upload = require("../utils/storage");
const { postPermission } = require("../permissions/roles");

const prefix = "/api/v1/posts-app";

router.post(
  `${prefix}/posts`,
  auth(postPermission),
  upload.array("img"),
  posts.createPosts
);
router.get(`${prefix}/posts`, posts.listPosts);
router.get(`${prefix}/related-posts/:id/:categoryId`, posts.listRelatedPosts);
router.get(`${prefix}/trending-posts`, posts.listTrendingPosts);
router.delete(`${prefix}/posts/:id`, auth(postPermission), posts.deletePost);
router.get(`${prefix}/posts/:id`, posts.getPost);
router.get(`${prefix}/posts-summary/:id`, posts.getPostSummary);

module.exports = router;
