const express = require('express');
const router = express.Router();
const { register, listUsers, getUser, userVerify } = require('../controllers/user')
const auth = require('../../middleware/auth')

router.post('/', register)
router.get('/', auth, listUsers)

router.get('/me', auth, getUser)

router.get('/verify/:id', userVerify)


module.exports = router