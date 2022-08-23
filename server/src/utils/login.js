require('dotenv').config();
const Joi = require('joi');
const { checkPassword } = require('./hash');
const User = require('../model').user
const { generateAuthToken } = require('./token')

function validate(auth) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().required(),
    })
    return schema.validate(auth);
}

exports.login = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ username: req.body.username });
    console.log(user.username, req.body.username)
    if (!user) return res.status(404).json({ "msg": "User Does not exist!" })

    const passwordValidate = await checkPassword(req.body.password, user.password)
    if (!passwordValidate) {
        return res.status(400).json({ "msg": "Invalid username/email or password" })
    }

    if (!user.isVerified) {
        return res.status(403).json({ "msg": "You are'nt verified yet, Please try again!" })
    }
    const token = generateAuthToken(user);
    res.json({
        "token": token
    })

}
