"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  Category.init(
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          min: 4,
          max: 80,
          notEmpty: true,
        },
      },
      slug: { type: DataTypes.STRING(100) },
      content: { type: DataTypes.TEXT },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      underscored: true,
      sequelize,
      modelName: "Category",
      tableName: "categories",
    }
  );
  return Category;
};
