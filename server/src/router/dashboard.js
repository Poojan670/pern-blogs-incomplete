const express = require("express");
require("express-async-errors");
const router = express.Router();
const dashboard = require("../controllers/dashboard");
const auth = require("../../middleware/auth");

const prefix = "/api/v1/dashboard-app";

router.get(`${prefix}/top-bloggers-list`, dashboard.listTopBloggers);

module.exports = router;
