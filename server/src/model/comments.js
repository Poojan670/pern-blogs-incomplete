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
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      parent: {
        type: DataTypes.INTEGER,
        references: {
          model: "comments",
          key: "id",
        },
      },
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
