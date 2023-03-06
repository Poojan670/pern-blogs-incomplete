require("dotenv").config();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { checkPassword } = require("./hash");
const { User } = require("../model");
const { generateAuthToken } = require("./token");
const { generateAuthRefreshToken } = require("./token");
const { apiError } = require("../../middleware/error");

function validate(auth) {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).required(),
    password: Joi.string().required(),
  });
  return schema.validate(auth);
}

exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  let user = await User.findOne({ where: { userName: req.body.userName } });
  if (!user) return apiError(res, "User Does not exist!");

  const passwordValidate = await checkPassword(
    req.body.password,
    user.password
  );
  if (!passwordValidate) {
    return apiError(res, "Invalid username or password");
  }

  if (!user.isVerified)
    return apiError(res, "You are'nt verified yet, Please try again!", 403);
  user.lastLogin = new Date();
  await user.save();
  res.json({
    accessToken: generateAuthToken(user),
    refreshToken: generateAuthRefreshToken(user),
    userName: user.userName,
    role: user.role,
  });
};

exports.refreshToken = async (req, res) => {
  if (!req.body.refreshToken) return apiError(res, "Missing token body");
  const decode = jwt.decode(req.body.refreshToken, process.env.SECRET_KEY);
  if (Date.now() >= decode.exp * 1000) {
    return apiError(res, "Token Expired");
  }
  const user = User.findByPk(decode.id);
  return res.status(200).json({ accessToken: generateAuthToken(user) });
};
