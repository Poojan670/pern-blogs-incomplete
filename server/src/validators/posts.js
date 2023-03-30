const Joi = require("joi");

const tagsSchema = {
  id: Joi.string().required(),
};

const postContentSchema = {
  img: Joi.string().allow(null, ""),
  content: Joi.string().min(1).required(),
};

module.exports = function validatePosts(posts) {
  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required(),
    slug: Joi.string().min(2).max(100),
    img: Joi.string().allow(null, ""),
    content: Joi.string().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.object(tagsSchema)).required(),
    postContent: Joi.array().items(Joi.object(postContentSchema)).required(),
  });
  return schema.validate(posts);
};
