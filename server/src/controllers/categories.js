const paginate = require("../../middleware/pagination");
const { User, Category, db } = require("../model");
const validate = require("../validators/categories");
const { apiError, apiSuccess } = require("../../middleware/error");
const { QueryTypes } = require("sequelize");

exports.listCategories = async (req, res) => {
  const categories = await db.sequelize.query(
    `select c.id, c.title, c.slug, c.content, c.parent, c.created_at as "createdAt", \
     u.user_name as "userName", \
     u.img, \
     cd.title as "parentTitle" from categories c \
     inner join users u on u.id=c.created_by \
     left join categories cd on cd.id=c.parent \
     order by c.id`,
    { type: QueryTypes.SELECT }
  );

  // const categories = await Category.findAll({
  //   attributes: {
  //     include: [[db.sequelize.col("user_name"), "userName"]],
  //   },
  //   include: [
  //     {
  //       model: User,
  //       attributes: [],
  //     },
  //   ],
  //   order: ["id"],
  // });

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
    slug: req.body.slug,
    content: req.body.content,
    parent: req.body.parent.id,
  });
  res.status(201).send(CategoryObj);
};

exports.getCategory = async (req, res) => {
  const CategoryObj = await Category.findByPk(req.params.id);
  if (!CategoryObj)
    return apiError(res, `Category with this id : ${req.params.id} not found`);
  res.send(CategoryObj);
};
