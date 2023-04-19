const express = require("express");
require("express-async-errors");
const router = express.Router();
const comments = require("../controllers/comments");
const auth = require("../../middleware/auth");
const { addCommentPermission } = require("../permissions/roles");

const prefix = "/api/v1/comments-app";

router.post(
  `${prefix}/comments`,
  auth(addCommentPermission),
  comments.postComment
);
router.get(`${prefix}/comments`, comments.listComments);
router.get(`${prefix}/blog-comments/:postsId`, comments.getBlogComments);

module.exports = router;
