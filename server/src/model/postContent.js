"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(PostContent, {
        foreignKey: "posts_id",
        foreignKeyConstraint: true,
        allowNull: false,
      });

      PostContent.belongsTo(models.Posts);
    }
  }

  PostContent.init(
    {
      img: DataTypes.STRING(500),
      content: DataTypes.TEXT,
      postsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      sequelize,
      modelName: "PostContent",
      tableName: "post_content",
    }
  );
  return PostContent;
};
