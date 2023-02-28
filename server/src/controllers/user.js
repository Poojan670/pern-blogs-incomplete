require("dotenv").config();
const _ = require("lodash");
const User = require("../model").user;
const jwt = require("jsonwebtoken");
const { generateVerificationToken } = require("../utils/token");
const { passwordHash } = require("../utils/hash");
const { mail } = require("../utils/mail.js");
const validate = require("../validators/user");
const paginate = require("../../middleware/pagination");
const { Op } = require("sequelize");

exports.listUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: "password" } });
  const result = await paginate(users, req, res);
  res.json(result);
};

exports.register = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });
  let user = await User.findOne({
    where: {
      [Op.or]: { email: req.body.email, username: req.body.username },
    },
  });
  if (user) {
    return res.status(400).json({
      msg: "User with this email or username already exists!",
    });
  }
  if (req.body.password != req.body.confirmPassword)
    return res.status(400).json({ msg: "Password doesn't match" });
  try {
    user = new User(_.pick(req.body, ["username", "email", "password"]));
    user.password = await passwordHash(user.password);
    user.isVerified = true;
    await user.save();

    // const verifyToken = generateVerificationToken(user.id);
    // await mail(user.email, verifyToken);

    return res.status(201).json({
      msg: `Sent a verification email to ${user.email}`,
    });
  } catch (err) {
    res.status(400).json({
      msg: `${err}`,
    });
  }
};

exports.userVerify = async (req, res) => {
  const token = req.params.id;
  if (!token) {
    return res.status(422).json({ msg: "Missing Token" });
  }

  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(500).send(err);
  }

  const user = await User.findOne({
    where: {
      id: payload.id,
    },
  });
  if (!user) {
    return res.status(404).json({
      msg: "User does not  exists",
    });
  }
  user.isVerified = true;
  await user.save();

  return res.status(200).json({
    msg: "Account Verified",
  });
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: "password" },
  });
  if (!user) return res.status(403).json({ msg: "User not found!" });
  res.send(user);
};
