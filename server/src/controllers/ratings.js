const { Ratings, Posts } = require("../model");
const validate = require("../validators/ratings");
const { apiError } = require("../../middleware/error");
const paginate = require("../../middleware/pagination");

exports.postRatings = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  const post = Posts.findByPk(req.body.postsId);
  if (!post) return apiError(res, `Post not found`);

  const existingRatings = await Ratings.findOne({
    where: { postsId: post.id },
  });
  if (existingRatings) {
    return apiError(res, `Ratings already exist for this post`);
  }
  const ratings = Ratings.create({
    postsId: post.id,
    ratings: req.body.ratings,
    createdBy: req.user.id,
  });
  res.status(201).json(ratings);
};

exports.updateRatings = async (req, res) => {
  const { ratings } = req.body;
  const updateRatings = await Ratings.update(
    {
      ratings,
    },
    { where: { id: req.params.id }, returning: true }
  );
  if (!updateRatings[0])
    return apiError(res, `Ratings with this id : ${req.params.id} not found`);
  res.json(updateRatings[1][0]);
};

exports.deleteRating = async (req, res) => {
  await Ratings.findByPk(req.params.id)
    .then(function (rating) {
      rating
        .destroy()
        .then((e) => apiError(res, "Ratings deleted successfully", 404))
        .catch((e) => apiError(res, "Error occurred"));
    })
    .catch((e) => apiError(res, "Rating not found"));
};

exports.getRting = async (req, res) => {
  const rating = await Ratings.findByPk(req.params.id);
  if (!rating) return apiError(res, "Rating not found!");
  res.send(rating);
};

exports.getRatingsByPost = async (req, res) => {
  const ratings = await Ratings.findAll({ where: { postsId: req.params.id } });
  res.json(await paginate(ratings, req, res));
};
