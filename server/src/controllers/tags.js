const { Tags, Category } = require("../model");
const paginate = require("../../middleware/pagination");

exports.listTags = async (req, res) => {
  res.json(await paginate(await Tags.findAll(), req, res));
};
