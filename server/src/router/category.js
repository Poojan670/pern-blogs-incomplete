const express = require("express");
require("express-async-errors");
const router = express.Router();
const categories = require("../controllers/categories");
const auth = require("../../middleware/auth");
const {
  postCategoryPermission,
  listCategoryPermission,
  updateCategoryPermission,
  deleteCategoryPermission,
} = require("../permissions/roles");

const prefix = "/api/v1/category-app";

router.post(
  `${prefix}/category`,
  auth(postCategoryPermission),
  categories.createCategory
);
router.get(
  `${prefix}/category`,
  auth(listCategoryPermission),
  categories.listCategories
);
router.patch(
  `${prefix}/category/:id`,
  auth(updateCategoryPermission),
  categories.updateCategory
);
router.delete(
  `${prefix}/category/:id`,
  auth(deleteCategoryPermission),
  categories.deleteCategory
);
router.get(`${prefix}/category/:id`, auth(), categories.getCategory);

module.exports = router;
