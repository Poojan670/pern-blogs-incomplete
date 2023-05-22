const { apiError } = require("../../middleware/error");
const paginate = require("../../middleware/pagination");
const { User, Posts, Comments, db } = require("../model");
const { Sequelize, Op, QueryTypes } = require("sequelize");

exports.listTopBloggers = async (req, res) => {
  try {
    const top3users = await db.sequelize.query(
      `
      select 
      u.id, 
      u.role as roles,
      u.full_name as "fullName",
      u.user_name as "userName", 
      u.img,
      u.email,
      count(distinct p.id) as "postCount", 
      count(distinct c.id) as "commentCount" 
    from 
      users u 
      left join posts p on p.created_by = u.id 
      left join comments c on c.created_by = u.id 
    group by 
      u.id 
    order by 
      (
        (count(distinct p.id))
         + 
        (count(distinct c.id))
      ) desc limit 3
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const result = await paginate(top3users, req, res);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

exports.listMyTopBloggers = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return apiError("Missing params");
    const myTop3Bloggers = await db.sequelize.query(
      `
      SELECT 
        u.id, 
        u.user_name AS "userName", 
        u.img,
        COUNT(DISTINCT p.id) AS "postCount", 
        COUNT(DISTINCT c.id) AS "commentCount",
        COUNT(DISTINCT CASE WHEN l.type='POST' AND l.like_type='LIKE' THEN l.id END) AS "likeCount",
        COUNT(DISTINCT CASE WHEN l.type='POST' AND l.like_type='DISLIKE' THEN l.id END) AS "dislikeCount"
      FROM 
        users u 
        JOIN posts p ON p.created_by = u.id 
        LEFT JOIN comments c ON c.posts_id = p.id
        LEFT JOIN likes l ON l.posts_id = p.id 
        WHERE 
          p.created_by = ${userId}
      GROUP BY 
        u.id 
        ORDER BY 
        (
          COUNT(DISTINCT c.id) 
          + 
          COUNT(DISTINCT CASE WHEN l.type = 'POST' AND l.like_type = 'LIKE' THEN l.id END)
          - 
          COUNT(DISTINCT CASE WHEN l.type = 'POST' AND l.like_type = 'DISLIKE' THEN l.id END)
        ) DESC 
      LIMIT 3
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    const result = await paginate(myTop3Bloggers, req, res);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
