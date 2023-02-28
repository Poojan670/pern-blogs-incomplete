require("dotenv").config();
const Joi = require("joi");
const { checkPassword } = require("./hash");
const User = require("../model").user;
const { generateAuthToken } = require("./token");
const { generateAuthRefreshToken } = require("./token");

function validate(auth) {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).required(),
    password: Joi.string().required(),
  });
  return schema.validate(auth);
}

exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  let user = await User.findOne({ where: { userName: req.body.userName } });
  if (!user) return res.status(400).json({ msg: "User Does not exist!" });

  const passwordValidate = await checkPassword(
    req.body.password,
    user.password
  );
  if (!passwordValidate) {
    return res.status(400).json({ msg: "Invalid username/email or password" });
  }

  if (!user.isVerified) {
    return res
      .status(403)
      .json({ msg: "You are'nt verified yet, Please try again!" });
  }
  user.lastLogin = new Date();
  await user.save();
  res.json({
    access_token: generateAuthToken(user),
    refresh_token: generateAuthRefreshToken(user),
    username: user.username,
  });
};
