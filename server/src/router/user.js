const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const auth = require('../../middleware/auth')
const { login } = require('../utils/login')

const prefix = '/api/v1/user-app'


router.post(`${prefix}/register`, user.register)
router.get(`${prefix}/users`, auth, user.listUsers)
router.get(`${prefix}/me`, auth, user.getUser)
router.get(`${prefix}/verify/:id`, user.userVerify)
router.post(`${prefix}/login`, login)


module.exports = router