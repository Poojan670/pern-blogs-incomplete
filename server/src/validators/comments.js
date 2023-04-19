const Joi = require("joi");

module.exports = function validateComments(comments) {
  const schema = Joi.object({
    content: Joi.string().min(1).required(),
    postsId: Joi.string().required(),
    parent: Joi.string().allow(null, ""),
  });
  return schema.validate(comments);
};
