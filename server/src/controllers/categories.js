const paginate = require("../../middleware/pagination");
const { user, category, sequelize } = require("../model");
const validate = require("../validators/categories");
const { apiError, apiSuccess } = require("../../middleware/error");

exports.listCategories = async (req, res) => {
  const categories = await category.findAll({
    attributes: {
      include: [[sequelize.col("userName"), "userName"]],
    },
    include: [
      {
        model: user,
        attributes: [],
      },
    ],
  });
  const result = await paginate(categories, req, res);
  res.json(result);
};

exports.createCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  let category = await category.findOne({
    where: { title: req.body.title },
  });
  if (category)
    return apiError(
      res,
      `Category with this title : ${req.body.title} already exists`
    );

  category = await category.create({
    title: req.body.title,
    createdBy: req.user.id,
  });
  res.status(201).send(category);
};

exports.getCategory = async (req, res) => {
  const category = await category.findByPk(req.params.id);
  if (!category)
    return apiError(res, `Category with this id : ${req.params.id} not found`);
  res.send(category);
};
