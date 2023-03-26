const { Tags } = require("../model");
const paginate = require("../../middleware/pagination");
const validate = require("../validators/tags");
const { apiError } = require("../../middleware/error");

exports.listTags = async (req, res) => {
  res.json(await paginate(await Tags.findAll(), req, res));
};

exports.createTags = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  const { title, slug, content } = req.body;
  const createdBy = req.user.id;
  const newTag = await Tags.create({ title, slug, content, createdBy });

  res.status(201).json(newTag);
};

exports.updateTag = async (req, res) => {
  const { title, slug, content } = req.body;
  const updateTag = await Tags.update(
    {
      title,
      slug,
      content,
    },
    { where: { id: req.params.id }, returning: true }
  );
  if (!updateTag[0])
    return apiError(res, `Tags with this id : ${req.params.id} not found`);
  res.json(updateTag[1][0]);
};

exports.deleteTag = async (req, res) => {
  await Tags.findByPk(req.params.id)
    .then(function (tag) {
      tag
        .destroy()
        .then((e) => apiError(res, "Tag deleted successfully", 404))
        .catch((e) => apiError(res, "Error occurred"));
    })
    .catch((e) => apiError(res, "Tag not found"));
};

exports.getTag = async (req, res) => {
  const tag = await Tags.findByPk(req.params.id);
  if (!tag) return apiError(res, "Tag not found!");
  res.send(tag);
};
