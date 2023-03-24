const paginate = require("../../middleware/pagination");
const { Tags, Posts, PostTags, PostContent } = require("../model");
const validate = require("../validators/posts");
const { apiError } = require("../../middleware/error");

exports.listPosts = async (req, res) => {
  const posts = await Posts.findAll();
  const result = await paginate(posts, req, res);
  res.json(result);
};

exports.createPosts = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  const tags = req.body.tags;
  const postContent = req.body.postContent;
  await tags.forEach((tag) => {
    const tagObj = Tags.findByPk(tag);
    if (!tagObj) return apiError(res, `Tag with this id : ${tag} not found`);
  });
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  let img;
  if (!req.file) {
    img = `${protocol}://${req.get("host")}//images//gintoki.png`;
  } else {
    img = `${protocol}://${req.get("host")}//images//${req.file.filename}`;
  }

  const posts = await Posts.create({
    title: req.body.title,
    slug: req.body.title,
    createdBy: req.user.id,
    categoryId: req.body.categoryId,
    img: img
  });

  await tags.forEach((tag) => {
    PostTags.create({
      tagsId: tag,
      postsId: posts.id,
    });
  });

  await postContent.forEach((content) => {
    PostContent.create({
      img: content.img,
      content: content.content,
      postsId: posts.id,
    });
  });

  res.status(201).send(posts);
};

exports.getPost = async (req, res) => {
  const post = await Posts.findByPk(req.params.id);
  if (!post)
    return apiError(res, `Post with this id : ${req.params.id} not found`);
  res.send(post);
};

exports.deletePost = async (req, res) => {
  await Posts.findByPk(req.params.id)
    .then(function (post) {
      post
        .destroy()
        .then((e) => apiError(res, "Post deleted successfully", 404))
        .catch((e) => apiError(res, "Error occurred"));
    })
    .catch((e) => apiError(res, "Post not found"));
};
