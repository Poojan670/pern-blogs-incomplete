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
      models.Category.hasMany(Posts, {
        foreignKey: "category_id",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Posts.belongsTo(models.Category, {
        onDelete: "RESTRICT",
      });

      models.User.hasMany(Posts, {
        foreignKey: "created_by",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Posts.belongsTo(models.User);
      Posts.belongsToMany(models.Tags, { through: "post_tags" });
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
        allowNull: false,
        validate: {
          notEmpty: true,

          notNull: true,
        },
      },
      createdBy: DataTypes.INTEGER,
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
