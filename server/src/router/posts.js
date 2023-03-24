const express = require("express");
require("express-async-errors");
const router = express.Router();
const posts = require("../controllers/posts");
const auth = require("../../middleware/auth");
const {
    postPermission,
} = require("../permissions/roles");

const prefix = "/api/v1/posts-app";

router.post(`${prefix}/posts`, auth(postPermission), posts.createPosts);
router.get(`${prefix}/posts`, posts.listPosts);
router.delete(`${prefix}/posts/:id`, auth(postPermission), posts.deletePost);
router.get(`${prefix}/posts/:id`, posts.getPost);

module.exports = router;
