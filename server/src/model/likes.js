"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(Likes, {
        foreignKey: "posts_id",
        foreignKeyConstraint: true,
        allowNull: true,
      });
      Likes.belongsTo(models.Posts, {
        foreignKey: "comments_id",
      });

      models.Comments.hasMany(Likes, {
        foreignKey: "comments_id",
        foreignKeyConstraint: true,
        allowNull: true,
      });
      Likes.belongsTo(models.Comments, {
        foreignKey: "comments_id",
      });

      models.User.hasMany(Likes, {
        foreignKey: "created_by",
        foreignKeyConstraint: true,
        allowNull: false,
      });

      Likes.belongsTo(models.User, {
        foreignKey: "created_by",
      });
    }
  }

  Likes.init(
    {
      likeType: {
        type: DataTypes.ENUM("LIKE", "DISLIKE"),
        defaultValue: "LIKE",
      },
      type: {
        type: DataTypes.ENUM("POST", "COMMENT"),
        defaultValue: "POST",
      },
      postsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdBy: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      underscored: true,
      sequelize,
      modelName: "Likes",
      tableName: "likes",
    }
  );
  return Likes;
};
