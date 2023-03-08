const Joi = require("joi");

module.exports = function validateUser(categories) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    slug: Joi.string().max(100).required(),
    content: Joi.string(),
    parent: Joi.object(),
  });
  return schema.validate(categories);
};
