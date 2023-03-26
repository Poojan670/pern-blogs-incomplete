const { apiSuccess, apiError } = require("../../middleware/error");
const { Posts, Likes } = require("../model");

async function toggleLike(req, res, type, likeType, idField) {
  const { id } = req.params;
  const like = await Likes.findOne({
    where: {
      [idField]: id,
      createdBy: req.user.id,
      likeType,
      type,
    },
  });
  if (!like) {
    await Likes.create({
      likeType,
      type,
      [idField]: id,
      createdBy: req.user.id,
    });
  }
  const message =
    likeType === "LIKE" ? "Liked successfully" : "Disliked successfully";
  return apiSuccess(res, message);
}

exports.likePost = async (req, res) => {
  return toggleLike(req, res, "POST", "LIKE", "postsId");
};

exports.dislikePost = async (req, res) => {
  return toggleLike(req, res, "POST", "DISLIKE", "postsId");
};

exports.likeComment = async (req, res) => {
  return toggleLike(req, res, "COMMENT", "LIKE", "commentsId");
};

exports.dislikeComment = async (req, res) => {
  return toggleLike(req, res, "COMMENT", "DISLIKE", "commentsId");
};

exports.getPostLikes = async (req, res) => {
  const { id } = req.params.id;
  const post = await Posts.findByPk(id);

  if (!post) {
    return apiError(res, `Post with this id : ${id} not found`);
  }

  const [likesCount, dislikesCount] = await Promise.all([
    Likes.count({
      where: {
        likeType: "LIKE",
        type: "POST",
        postsId: id,
      },
    }),
    Likes.count({
      where: {
        likeType: "DISLIKE",
        type: "POST",
        postsId: id,
      },
    }),
  ]);

  res.json({
    post,
    likesCount,
    dislikesCount,
  });
};
