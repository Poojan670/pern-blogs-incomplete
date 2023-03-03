const paginate = require("../../middleware/pagination");
const { user, category, sequelize } = require("../model");
const validate = require("../validators/categories");
const { apiError, apiSuccess } = require("../../middleware/error");
const queryTypes = require("sequelize/lib/query-types");

exports.listCategories = async (req, res) => {
  const categories = await sequelize.query(
    "select u.user_name, c.id, c.title from categories c inner join users u on u.id=c.created_by",
    { type: queryTypes.SELECT }
  );
  // attributes: {
  //   include: [[sequelize.col("userName"), "userName"]],
  // },
  // include: [
  //   {
  //     model: user,
  //     attributes: [],
  //   },
  // ],
  // });
  const result = await paginate(categories, req, res);
  res.json(result);
};

exports.createCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  let CategoryObj = await category.findOne({
    where: { title: req.body.title },
  });
  if (CategoryObj)
    return apiError(
      res,
      `Category with this title : ${req.body.title} already exists`
    );

  CategoryObj = await category.create({
    title: req.body.title,
    createdBy: req.user.id,
  });
  res.status(201).send(CategoryObj);
};

exports.getCategory = async (req, res) => {
  const CategoryObj = await category.findByPk(req.params.id);
  if (!CategoryObj)
    return apiError(res, `Category with this id : ${req.params.id} not found`);
  res.send(CategoryObj);
};
