const { Tags } = require("../model");
const paginate = require("../../middleware/pagination");

exports.listTags = async (req, res) => {
  const tags = await Tags.findAll();
  const result = await paginate(tags, req, res);
  res.json(result);
};
