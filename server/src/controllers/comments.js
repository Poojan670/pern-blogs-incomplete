const paginate = require("../../middleware/pagination");
const { Comments, User, Posts, db } = require("../model");
const { apiError } = require("../../middleware/error");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const validate = require("../validators/comments");
const _ = require("lodash");

/**
 * Create a new comment on a post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Returns the newly created comment
 */
exports.postComment = async (req, res) => {
  // Validate the request body using a validation function and return an error if it exists
  const { error } = validate(req.body);
  if (error) return apiError(res, error.details[0].message);

  // Find the post with the given ID and return an error if it does not exist
  const post = await Posts.findByPk(req.body.postsId);
  if (!post)
    return apiError(res, `Posts with id ${req.body.postsId} not found`);

  // Check if a parent comment ID was provided, and if so, find the parent comment and return an error if it does not exist
  if (req.body.parent) {
    const [parentComment] = await db.sequelize.query(
      `SELECT * FROM Comments WHERE id = ?`,
      {
        replacements: [req.body.parent],
        type: QueryTypes.SELECT,
      }
    );

    if (!parentComment) {
      return apiError(res, `Comment with id ${req.body.parent} not found`);
    }
  }

  // Create a new comment with the given details, including the authenticated user ID as the createdBy field
  const [results, metadata] = await db.sequelize.query(
    `INSERT INTO Comments (created_by, content, posts_id, parent, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`,
    {
      replacements: [
        req.user.id,
        req.body.content,
        req.body.postsId,
        req.body.parent || null,
      ],
      type: QueryTypes.INSERT,
    }
  );

  const commentId = metadata.lastInsertId;
  const comment = await Comments.findByPk(commentId);

  // Send a 201 status code along with the newly created comment object
  res.status(201).send(comment);
};

exports.listComments = async (req, res) => {
  const comments = await db.sequelize.query(
    `
    SELECT 
    c.id, 
    c.content, 
    c.posts_id as "postsId",  
    c.created_at as "createdAt",
    u.user_name as "userName", 
    u.img,
    CASE 
      WHEN cd.id IS NOT NULL THEN 
        json_build_object(
          'id', cd.id, 
          'content', cd.content, 
          'userName', up.user_name,
          'img', up.img,
          'createdAt', cd.created_at
        )
      ELSE NULL 
    END as parent
  FROM 
    comments c 
    INNER JOIN users u ON u.id = c.created_by 
    LEFT JOIN comments cd ON cd.id = c.parent 
    LEFT JOIN users up ON up.id = cd.created_by
  GROUP BY 
    c.id, 
    u.user_name, 
    u.img, 
    cd.id, 
    cd.content,
    up.user_name,
    up.img,
    cd.created_at
  ORDER BY
    c.id;
      `,
    { type: QueryTypes.SELECT }
  );
  const result = await paginate(comments, req, res);
  res.json(result);
};

exports.getBlogComments = async (req, res) => {
  const post = await Posts.findByPk(req.params.postsId);
  if (!post)
    return apiError(res, `Posts with id ${req.body.postsId} not found`);
  const comments = await db.sequelize.query(
    `
    SELECT 
    c.id, 
    c.content, 
    c.posts_id as "postsId",  
    c.parent,
    c.created_at as "createdAt",
    u.user_name as "userName", 
    u.img
  FROM 
    comments c 
    INNER JOIN users u ON u.id = c.created_by 
  WHERE c.posts_id=${req.params.postsId}
  GROUP BY 
    c.id, 
    u.user_name, 
    u.img;
  `,
    { type: QueryTypes.SELECT }
  );
  res.json(comments);
};
