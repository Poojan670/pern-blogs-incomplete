const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const envConfigs = require("../../main/db/config/config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
  console.log("Connected to Database");
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require("./user")(sequelize, DataTypes);
const Tags = require("./tags")(sequelize, DataTypes);
const Category = require("./category")(sequelize, DataTypes);
const Posts = require("./posts")(sequelize, DataTypes);
const PostTags = require("./postTags")(sequelize, DataTypes);
const PostContent = require("./postContent")(sequelize, DataTypes);
const Comments = require("./comments")(sequelize, DataTypes);
const Likes = require("./likes")(sequelize, DataTypes);
const Ratings = require("./ratings")(sequelize, DataTypes);

// associations

// Category Associations
User.hasMany(Category, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Category.belongsTo(User, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});

Category.hasMany(Category, {
  foreignKey: "parent",
  foreignKeyConstraint: true,
});

Category.belongsTo(Category, {
  foreignKey: "parent",
  onDelete: "Cascade",
});

// tags
User.hasMany(Tags, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Tags.belongsTo(User, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
  onDelete: "Cascade",
});

// posts
Category.hasMany(Posts, {
  foreignKey: "category_id",
  foreignKeyConstraint: true,
});
Posts.belongsTo(Category, {
  onDelete: "RESTRICT",
  foreignKey: "category_id",
  foreignKeyConstraint: true,
});

User.hasMany(Posts, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Posts.belongsTo(User, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Posts.belongsToMany(Tags, {
  through: "post_tags",
});

// post content
Posts.hasMany(PostContent, {
  foreignKey: "posts_id",
  foreignKeyConstraint: true,
});
PostContent.belongsTo(Posts, {
  foreignKey: "posts_id",
  foreignKeyConstraint: true,
});

// likes
Posts.hasMany(Likes, {
  foreignKey: "posts_id",
  foreignKeyConstraint: true,
});
Likes.belongsTo(Posts, {
  foreignKey: "comments_id",
  foreignKeyConstraint: true,
});
Comments.hasMany(Likes, {
  foreignKey: "comments_id",
  foreignKeyConstraint: true,
});
Likes.belongsTo(Comments, {
  foreignKey: "comments_id",
  foreignKeyConstraint: true,
});

User.hasMany(Likes, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Likes.belongsTo(User, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});

// comments
Posts.hasMany(Comments, {
  foreignKey: "posts_id",
  foreignKeyConstraint: true,
});
Comments.belongsTo(Posts);
User.hasMany(Comments, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Comments.belongsTo(User);
Posts.hasMany(Comments, {
  foreignKey: "parent",
  foreignKeyConstraint: true,
});
Comments.belongsTo(Posts, {
  foreignKey: "parent",
  onDelete: "RESTRICT",
});

// ratings
Posts.hasMany(Ratings, {
  foreignKey: "posts_id",
  foreignKeyConstraint: true,
});
Ratings.belongsTo(Posts);
User.hasMany(Ratings, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});
Ratings.belongsTo(User, {
  foreignKey: "created_by",
  foreignKeyConstraint: true,
});

// db.sequelize.sync({ force: false, alter: false });

module.exports = {
  db,
  User,
  Tags,
  Category,
  Posts,
  PostTags,
  PostContent,
  Comments,
  Likes,
  Ratings,
};
