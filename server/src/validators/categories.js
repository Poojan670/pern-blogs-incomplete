const Joi = require("joi");

module.exports = function validateUser(categories) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(categories);
};
