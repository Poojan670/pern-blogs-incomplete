const _ = require("lodash");
const User = require("../model").user;
const jwt = require("jsonwebtoken");
const { generateVerificationToken } = require("../utils/token");
const { passwordHash } = require("../utils/hash");
const { mail } = require("../utils/mail.js");
const validate = require("../validators/user");
const paginate = require("../../middleware/pagination");
const { Op } = require("sequelize");
const { apiError, apiSuccess } = require("../../middleware/error");

exports.listUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: "password" } });
  const result = await paginate(users, req, res);
  res.json(result);
};

exports.register = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  let img;
  if (!req.file) {
    img = `${protocol}://${req.get("host")}//images//gintoki.png`;
  } else {
    img = `${protocol}://${req.get("host")}//images//${req.file.filename}`;
  }
  let user = await User.findOne({
    where: {
      [Op.or]: { email: req.body.email, userName: req.body.userName },
    },
  });
  if (user) {
    return apiError(res, "User with this email or username already exists!");
  }
  user = new User(
    _.pick(req.body, ["userName", "email", "password", "fullName", "content"])
  );
  user.password = await passwordHash(user.password);
  user.img = img;
  await user.save();
  const verifyToken = generateVerificationToken(user.id);
  await mail(user.email, verifyToken);
  return apiSuccess(res, `Sent a verification email to ${user.email}`, 201);
};

exports.userVerify = async (req, res) => {
  const token = req.params.id;
  if (!token) return apiError(res, "Missing Token");
  payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findOne({
    where: {
      id: payload.id,
    },
  });
  if (!user) return apiError(res, "User does not  exists");
  user.isVerified = true;
  user.verifiedAt = new Date();
  await user.save();
  return apiSuccess(res, "Account Verified");
};

exports.resendToken = async (req, res) => {
  if (!req.params.email) return apiError(res, "Missing Params");
  const user = await User.findOne({ where: { email: req.params.email } });
  if (user.isVerified) return apiError(res, "User already verified");
  const verifyToken = generateVerificationToken(user.id);
  await mail(user.email, verifyToken);
  return apiSuccess(res, `Sent a verification email to ${user.email}`);
};

exports.updateUser = async (req, res) => {
  if (req.params.id != req.user.id) return apiError(res, "Not Allowed", 401);
  const user = await User.findByPk(req.params.id);
  if (!user) return apiError(res, "User not found");
  let img;
  if (req.file) {
    img = `${protocol}://${req.get("host")}//images//${req.file.filename}`;
  } else {
    img = user.img;
  }
  User.update({
    fullName: req.body.fullName,
    content: req.body.content,
    img: img,
  });
  return res.send(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByPk(req.params.id)
    .then(function (user) {
      user
        .destroy()
        .then((e) => apiError(res, "User deleted successfully", 404))
        .catch((e) => apiError(res, "Error occurred"));
    })
    .catch((e) => apiError(res, "User not found"));
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: "password" },
  });
  if (!user) return apiError(res, "User not found!");
  res.send(user);
};
