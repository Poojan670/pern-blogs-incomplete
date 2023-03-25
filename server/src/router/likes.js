const express = require("express");
require("express-async-errors");
const router = express.Router();
const likes = require("../controllers/likes");
const auth = require("../../middleware/auth");

const prefix = "/api/v1/likes-app";

router.post(`${prefix}/like/post/:id`, auth(), likes.likePost);
router.post(`${prefix}/dislike/post/:id`, auth(), likes.dislikePost);
router.post(`${prefix}/like/comment/:id`, auth(), likes.likeComment);
router.post(`${prefix}/dislike/comment/:id`, auth(), likes.dislikeComment);
router.get(`${prefix}/like/post/:id`, auth(), likes.getPostLikes);

module.exports = router;
