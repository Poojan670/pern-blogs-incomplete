const express = require("express");
require("express-async-errors");
const router = express.Router();
const user = require("../controllers/user");
const auth = require("../../middleware/auth");
const { login } = require("../utils/login");
const upload = require("../utils/storage");
const {
  listUsersPermission,
  deleteUserPermission,
} = require("../permissions/roles");

const prefix = "/api/v1/user-app";

router.post(`${prefix}/register`, upload.single("img"), user.register);
router.get(`${prefix}/users`, auth(listUsersPermission), user.listUsers);
router.get(`${prefix}/me`, auth(), user.getUser);
router.patch(`${prefix}/user/:id`, auth(), user.updateUser);
router.delete(
  `${prefix}/user/:id`,
  auth(deleteUserPermission),
  user.deleteUser
);
router.get(`${prefix}/verify/:id`, user.userVerify);
router.post(`${prefix}/login`, login);

module.exports = router;
