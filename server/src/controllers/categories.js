const paginate = require("../../middleware/pagination");
const { User, Category, db } = require("../model");
const validate = require("../validators/categories");
const { apiError, apiSuccess } = require("../../middleware/error");

exports.listCategories = async (req, res) => {
  const categories = await Category.findAll({
    attributes: {
      include: [[db.sequelize.col("user_name"), "userName"]],
    },
    include: [
      {
        model: User,
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

  let CategoryObj = await Category.findOne({
    where: { title: req.body.title },
  });
  if (CategoryObj)
    return apiError(
      res,
      `Category with this title : ${req.body.title} already exists`
    );

  CategoryObj = await Category.create({
    title: req.body.title,
    createdBy: req.user.id,
  });
  res.status(201).send(CategoryObj);
};

exports.getCategory = async (req, res) => {
  const CategoryObj = await Category.findByPk(req.params.id);
  if (!CategoryObj)
    return apiError(res, `Category with this id : ${req.params.id} not found`);
  res.send(CategoryObj);
};
