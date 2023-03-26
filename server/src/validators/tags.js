const Joi = require("joi");

module.exports = function validateTags(tags) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    slug: Joi.string().max(100).required(),
    content: Joi.string(),
  });
  return schema.validate(tags);
};
