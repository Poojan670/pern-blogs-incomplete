const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = function auth(req, res, next) {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({
        "msg": "Access Denied, No Token Provided !"
    })

    try {
        const decode = jwt.decode(token, process.env.SECRET_KEY)
        req.user = decode;
        next();
    } catch (err) {
        res.status(400).json({
            "msg": `Invalid Token, Please try again due to ${err}`
        })

    }
}