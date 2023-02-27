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
        foreignKey: "user_id",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Category.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Category.init(
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        notNull: false,
        validate: {
          min: 4,
          max: 30,
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Category",
      tableName: "categories",
    }
  );
  return Category;
};
