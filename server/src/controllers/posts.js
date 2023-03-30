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
const { Sequelize, Op } = require("sequelize");

exports.listPosts = async (req, res) => {
  const posts = await Posts.findAll({
    attributes: [
      "id",
      "title",
      "slug",
      "img",
      "content",
      "createdAt",
      "categoryId",
      "views",
    ],
    include: [
      {
        model: Category,
        attributes: ["id", "title"],
      },
      {
        model: User,
        attributes: ["id", "img", "userName", "role"],
      },
    ],
  });
  const result = await paginate(posts, req, res);
  res.json(result);
};

exports.listRelatedPosts = async (req, res) => {
  const postsId = req.params.id;
  const categoryId = req.params.categoryId;
  const posts = await Posts.findAll({
    attributes: [
      "id",
      "title",
      "slug",
      "img",
      "content",
      "createdAt",
      "categoryId",
    ],
    where: {
      id: {
        [Op.not]: postsId,
      },
    },
    include: [
      {
        model: Category,
        attributes: ["id", "title"],
        where: {
          id: {
            [Op.eq]: categoryId,
          },
        },
      },
      {
        model: User,
        attributes: ["id", "img", "userName", "role"],
      },
    ],
  });
  const result = await paginate(posts, req, res);
  res.json(result);
};

exports.listTrendingPosts = async (req, res) => {
  const today = new Date(); // get today's date
  const oneWeekAgo = new Date(today); // create a new Date object
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const posts = await Posts.findAll({
    attributes: [
      "id",
      "title",
      "slug",
      "img",
      "content",
      "createdAt",
      "categoryId",
      "views",
    ],
    where: {
      createdAt: {
        [Op.between]: [oneWeekAgo, today],
      },
    },
    include: [
      {
        model: Category,
        attributes: ["id", "title"],
      },
      {
        model: User,
        attributes: ["id", "img", "userName", "role"],
      },
    ],
  });
  const result = await paginate(posts, req, res);
  res.json(result);
};

exports.getPostSummary = async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id, {
      attributes: [
        "id",
        "title",
        "img",
        "content",
        "createdAt",
        "updatedAt",
        "createdBy",
        "views",
        // [Sequelize.col("user_name"), "createdBy"],
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM likes
            WHERE posts_id = ${req.params.id}
            AND type = 'POST'
            AND like_type = 'LIKE'
          )`),
          "likesCount",
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM likes
            WHERE posts_id = ${req.params.id}
            AND type = 'POST'
            AND like_type = 'DISLIKE'
          )`),
          "dislikesCount",
        ],
        // [Sequelize.fn("COUNT", Sequelize.col("Likes.posts_id")), "likesCount"],
        // [Sequelize.fn("COUNT", Sequelize.col("dislikes.id")), "dislikesCount"],
      ],
      include: [
        {
          model: User,
          attributes: ["img", "userName", "role"],
        },
        {
          model: Category,
          attributes: ["id", "title"],
        },
        {
          model: Tags,
          through: PostTags,
          attributes: ["id", "title"],
        },
        {
          model: Ratings,
          attributes: ["id", "ratings"],
        },
        {
          model: PostContent,
          attributes: ["id", "img", "content"],
        },
        {
          model: Likes,
          where: {
            likeType: "LIKE",
            type: "POST",
          },
          required: false,
          attributes: [],
        },
        // {
        //   model: Comments,
        //   attributes: [
        //     [
        //       Sequelize.fn("COUNT", Sequelize.col("commentLikes.id")),
        //       "likesCount",
        //     ],
        //     [
        //       Sequelize.fn("COUNT", Sequelize.col("commentDislikes.id")),
        //       "dislikesCount",
        //     ],
        //   ],
        //   include: [
        //     {
        //       model: Likes,
        //       where: {
        //         likeTyp: "LIKE",
        //       },
        //       as: "commentLikes",
        //       required: false,
        //       attributes: [],
        //     },
        //     {
        //       model: Likes,
        //       where: {
        //         likeTyp: "DISLIKE",
        //       },
        //       as: "commentDislikes",
        //       required: false,
        //       attributes: [],
        //     },
        //   ],
        // },
      ],
      group: [
        "User.id",
        "User.user_name",
        "Category.id",
        "Tags.id",
        "Posts.id",
        "Tags.post_tags.post_id",
        "Tags.post_tags.tag_id",
        "Tags.post_tags.created_at",
        "Tags.post_tags.updated_at",
        "Ratings.id",
        "PostContents.id",
      ],
    });
    if (!post) {
      return apiError(res, `Post with thid id : ${req.params.id} not found`);
    }

    const postInstance = await Posts.findByPk(req.params.id);
    await postInstance.increment("views");

    return res.json(post);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.createPosts = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  const images = req.files;

  const tags = req.body.tags;
  const postContent = req.body.postContent;
  await tags.forEach((tag) => {
    const tagObj = Tags.findByPk(tag.id);
    if (!tagObj) return apiError(res, `Tag with this id : ${tag.id} not found`);
  });

  const img = images[0]
    ? `${req.protocol}://${req.get("host")}//images//${images[0].filename}`
    : null;

  const posts = await Posts.create({
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    createdBy: req.user.id,
    categoryId: req.body.category,
    img: img,
  });

  await tags.forEach((tag) => {
    PostTags.create({
      tagsId: tag.id,
      postsId: posts.id,
    });
  });

  const postContentPromises = postContent.map(async (content, i) => {
    try {
      const postContentImg = images[i + 1]
        ? `${req.protocol}://${req.get("host")}//images//${
            images[i + 1].filename
          }`
        : null;
      const postContentItem = await PostContent.create({
        img: postContentImg,
        content: content.content,
        postsId: posts.id,
      });
      return postContentItem;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
