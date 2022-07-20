require('dotenv').config()
const _ = require('lodash')
const User = require('../model').user
const sequelize = require('../model').sequelize
const jwt = require('jsonwebtoken')
const { generateVerificationToken } = require('../utils/token')
const { passwordHash } = require('../utils/hash')
const { mail } = require('../utils/mail.js')
const validate = require('../validators/user')


const listUsers = async (req, res) => {
    const users = await User.findAll()
    res.json(users)
}


const register = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email } || { username: req.body.username });
    if (user) {
        return res.status(400).json({
            "msg": "User with this email or username already exists!"
        })
    }
    try {
        user = new User(_.pick(req.body, ['username', 'email', 'password']))
        user.password = await passwordHash(user.password)

        const verifyToken = await generateVerificationToken(user.id)
        const url = `http://localhost:${process.env.PORT}/api/v1/user-app/user/verify/${verifyToken}`

        await mail(user.email, url)

        await user.save()

        return res.status(201).json({
            "msg": `Sent a verification email to ${user.email}`
        })

    } catch (err) {
        res.status(400).json({
            "msg": `${err}`
        })
    }
}

const userVerify = async (req, res) => {
    const token = req.params.id
    if (!token) {
        return res.status(422).json({ "msg": "Missing Token" })
    }

    try {
        payload = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        );
        console.log(payload)
    } catch (err) {
        return res.status(500).send(err);
    }

    const user = await User.findOne({ id: payload.id }).exec();
    if (!user) {
        return res.status(404).json({
            "msg": "User does not  exists"
        });
    }
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
        "msg": "Account Verified"
    })
}

const getUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(403).json({ "msg": "User not found!" })
    res.send(user);
}

module.exports = {
    listUsers,
    register,
    getUser,
    userVerify
}