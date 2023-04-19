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
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    const result = await paginate(top3users, req, res);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
