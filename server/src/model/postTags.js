"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  PostTags.init(
    {
      selfGranted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      postsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "posts",
          key: "id",
        },
      },
      tagsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      sequelize,
      modelName: "PostTags",
      tableName: "post_tags",
    }
  );
  return PostTags;
};
