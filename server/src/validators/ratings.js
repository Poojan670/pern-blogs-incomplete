const Joi = require("joi");

module.exports = function validateRatings(rating) {
  const schema = Joi.object({
    postsId: Joi.string().required(),
    ratings: Joi.number().min(1).max(5).required(),
  });
  return schema.validate(rating);
};
