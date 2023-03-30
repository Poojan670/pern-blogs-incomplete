"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          min: 10,
        },
      },
      slug: DataTypes.STRING(100),
      img: DataTypes.STRING(500),
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      content: DataTypes.TEXT,
    },
    {
      timestamps: true,
      underscored: true,
      sequelize,
      modelName: "Posts",
      tableName: "posts",
    }
  );

  return Posts;
};
