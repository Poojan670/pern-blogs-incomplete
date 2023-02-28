"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(Comments, {
        foreignKey: "posts_id",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Comments.belongsTo(models.Posts);

      models.User.hasMany(Comments, {
        foreignKey: "created_by",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Comments.belongsTo(models.User);

      models.Posts.hasMany(Comments, {
        foreignKey: "parent",
        foreignKeyConstraint: true,
        allowNull: false,
      });

      Comments.belongsTo(models.Posts, {
        onDelete: "RESTRICT",
      });
    }
  }

  Comments.init(
    {
      content: { type: DataTypes.TEXT, notEmpty: true, allowNull: false },
      postsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      createdBy: DataTypes.INTEGER,
      parent: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      underscored: true,
      sequelize,
      modelName: "Comments",
      tableName: "comments",
    }
  );
  return Comments;
};
