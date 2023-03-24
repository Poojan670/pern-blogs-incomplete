const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const tagsSchema = {
  id: Joi.object.required(),
};

const postContent = {
  img: Joi.allow(null, ""),
  content: Joi.string().min(1).required(),
};

module.exports = function validatePosts(posts) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required(),
    slug: Joi.string().min(2).max(100),
    img: Joi.allow(null, ""),
    categoryId: Joi.object().required(),
    tags: Joi.array.items(Joi.object(tagsSchema)).required(),
    postContent: Joi.array.items(Joi.object(postContent)).required(),
  });
  return schema.validate(posts);
};
