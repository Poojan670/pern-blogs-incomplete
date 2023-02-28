"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(Category, {
        foreignKey: "created_by",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Category.belongsTo(models.User);

      Category.hasMany(Category, {
        foreignKey: "parent",
        foreignKeyConstraint: true,
        allowNull: true,
      });

      Category.belongsTo(Category, {
        onDelete: "RESTRICT",
      });
    }
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
      createdBy: DataTypes.INTEGER,
      parent: DataTypes.INTEGER,
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
