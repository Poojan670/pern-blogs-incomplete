const paginate = require("../../middleware/pagination");
const { Category, db } = require("../model");
const validate = require("../validators/categories");
const { apiError } = require("../../middleware/error");
const { QueryTypes } = require("sequelize");

exports.listCategories = async (req, res) => {
  const categories = await db.sequelize.query(
    `
    SELECT 
    c.id, 
    c.title, 
    c.slug, 
    c.content,  
    c.created_at as "createdAt",
    u.user_name as "userName", 
    u.img,
    CASE 
        WHEN cd.id IS NOT NULL 
            THEN json_build_object('id', cd.id, 'title', cd.title)
        ELSE NULL 
    END as parent
    FROM 
        categories c 
        INNER JOIN users u ON u.id = c.created_by 
        LEFT JOIN categories cd ON cd.id = c.parent 
    GROUP BY 
      c.id, 
      u.user_name, 
      u.img, 
      cd.id, 
      cd.title
    ORDER BY
      c.id
    `,
    { type: QueryTypes.SELECT }
  );
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

exports.updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category)
    return apiError(res, `Category with this id : ${req.params.id} not found`);

  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);
  let parent = null;
  if (req.body.parent) {
    parent = req.body.parent.id;
  }

  const updatedCategory = await category.update({
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    parent: parent,
  });

  res.status(200).send(updatedCategory);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByPk(req.params.id)
    .then(function (category) {
      category
        .destroy()
        .then((e) => apiError(res, "Category deleted successfully", 404))
        .catch((e) => apiError(res, "Error occurred"));
    })
    .catch((e) => apiError(res, "Category not found"));
};
