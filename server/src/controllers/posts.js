const paginate = require("../../middleware/pagination");
const {
  Tags,
  Posts,
  PostTags,
  PostContent,
  User,
  Category,
  Ratings,
  Likes,
  Comments,
} = require("../model");
const validate = require("../validators/posts");
const { apiError } = require("../../middleware/error");
const { Sequelize } = require("sequelize");

exports.listPosts = async (req, res) => {
  const posts = await Posts.findAll();
  const result = await paginate(posts, req, res);
  res.json(result);
};

exports.getPostSummary = async (req, res) => {
  const post = await Posts.findByPk(req.params.id, {
    attributes: [
      [Sequelize.col("user_name"), "userName"],
      [Sequelize.fn("COUNT", Sequelize.col("likes.id")), "likesCount"],
      [Sequelize.fn("COUNT", Sequelize.col("dislikes.id")), "dislikesCount"],
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
      {
        model: Category,
      },
      {
        model: PostTags,
      },
      {
        model: Ratings,
        attributes: ["ratings"],
      },
      {
        model: PostContent,
      },
      {
        model: Likes,
        where: {
          likeTyp: "LIKE",
        },
        as: "likes",
        required: false,
        attributes: [],
      },
      {
        model: Likes,
        where: {
          likeTyp: "DISLIKE",
        },
        as: "dislikes",
        required: false,
        attributes: [],
      },
      {
        model: Comments,
        attributes: [
          [
            Sequelize.fn("COUNT", Sequelize.col("commentLikes.id")),
            "likesCount",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("commentDislikes.id")),
            "dislikesCount",
          ],
        ],
        include: [
          {
            model: Likes,
            where: {
              likeTyp: "LIKE",
            },
            as: "commentLikes",
            required: false,
            attributes: [],
          },
          {
            model: Likes,
            where: {
              likeTyp: "DISLIKE",
            },
            as: "commentDislikes",
            required: false,
            attributes: [],
          },
        ],
      },
    ],
    group: [
      "Posts.id",
      "User.id",
      "Category.id",
      "PostTags.id",
      "Ratings.id",
      "PostContent.id",
      "Likes.id",
      "dislikes.id",
      "Comments.id",
      "commentLikes.id",
      "commentDislikes.id",
    ],
  });

  if (!post) {
    return apiError(res, `Post with thid id : ${req.params.id} not found`);
  }

  return res.json(post);
};

exports.createPosts = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  const tags = req.body.tags;
  const postContent = JSON.parse(req.body.postContent); // Parse the postContent string to JSON
  await tags.forEach((tag) => {
    const tagObj = Tags.findByPk(tag);
    if (!tagObj) return apiError(res, `Tag with this id : ${tag} not found`);
  });

  const img = req.file
    ? `${req.protocol}://${req.get("host")}//images//${req.file.filename}`
    : null;

  const posts = await Posts.create({
    title: req.body.title,
    slug: req.body.title,
    createdBy: req.user.id,
    categoryId: req.body.categoryId,
    img: img,
  });

  await tags.forEach((tag) => {
    PostTags.create({
      tagsId: tag,
      postsId: posts.id,
    });
  });

  const postContentPromises = postContent.map(async (content) => {
    const postContentImg = content.img
      ? `${req.protocol}://${req.get("host")}//images//${content.img}`
      : null;
    const postContentItem = await PostContent.create({
      img: postContentImg,
      content: content.content,
      postsId: posts.id,
    });
    return postContentItem;
  });
  const postContentItems = await Promise.all(postContentPromises);

  res.status(201).send({ posts, postContentItems });
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
