const express = require("express");
require("express-async-errors");
const router = express.Router();
const ratings = require("../controllers/ratings");
const auth = require("../../middleware/auth");

const prefix = "/api/v1/ratings-app";

router.post(`${prefix}/ratings/post/:id`, auth(), ratings.postRatings);
router.patch(`${prefix}/ratings/post/:id`, auth(), ratings.updateRatings);
router.delete(`${prefix}/ratings/post/:id`, auth(), ratings.deleteRating);
router.get(`${prefix}/ratings/post/:id`, auth(), ratings.getRatingsByPost);

module.exports = router;
