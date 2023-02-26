const express = require('express');
const router = express.Router();
const categories = require('../controllers/categories')
const auth = require('../../middleware/auth')

const prefix = '/api/v1/category-app'


router.post(`${prefix}/category`, auth, categories.createCategory)
router.get(`${prefix}/category`, auth, categories.listCategories)
router.get(`${prefix}/category/:id`, auth, categories.getCategory)


module.exports = router