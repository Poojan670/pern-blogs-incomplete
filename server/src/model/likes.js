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
        references: {
          model: "posts",
          key: "id",
        },
      },
      commentsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "comments",
          key: "id",
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
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
