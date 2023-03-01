const jwt = require("jsonwebtoken");
const { apiError } = require("../middleware/error");
const User = require("../src/model/index").user;

module.exports = function auth(permissions = null) {
  return async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return apiError(res, "Access Denied, No Token Provided !", 401);
    try {
      const decode = jwt.decode(token, process.env.SECRET_KEY);
      if (Date.now() >= decode.exp * 1000) {
        return res.status(400).json({
          msg: "Token Expired",
        });
      }
      req.user = decode;

      if (permissions) {
        const user = await User.findByPk(req.user.id);
        if (permissions.includes(user.role) && user.isVerified) {
          next();
        } else {
          apiError(res, `Not Allowed`, 403);
        }
      } else {
        next();
      }
    } catch (err) {
      apiError(res, `Invalid Token, Please try again due to ${err}`);
    }
  };
};
