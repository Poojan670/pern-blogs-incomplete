const express = require('express');
const router = express.Router();
const user = require('../controllers/user')
const auth = require('../../middleware/auth')
const { login } = require('../utils/login')

router.post('/', user.register)
router.get('/', auth, user.listUsers)

router.get('/me', auth, user.getUser)

router.get('/verify/:id', user.userVerify)
router.post('/login', login)


module.exports = router