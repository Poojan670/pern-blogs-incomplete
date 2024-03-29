const express = require("express");
require("express-async-errors");
const router = express.Router();
const tags = require("../controllers/tags");
const auth = require("../../middleware/auth");
const {
  postTagsPermission,
  updateTagsPermission,
  deleteTagsPermission,
} = require("../permissions/roles");

const prefix = "/api/v1/tags-app";

router.post(`${prefix}/tags`, auth(postTagsPermission), tags.createTags);
router.get(`${prefix}/tags`, tags.listTags);
router.patch(`${prefix}/tags/:id`, auth(updateTagsPermission), tags.updateTag);
router.delete(`${prefix}/tags/:id`, auth(deleteTagsPermission), tags.deleteTag);
router.get(`${prefix}/tags/:id`, auth(), tags.getTag);

module.exports = router;
