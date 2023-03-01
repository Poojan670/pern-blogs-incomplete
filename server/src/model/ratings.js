"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(Ratings, {
        foreignKey: "posts_id",
        foreignKeyConstraint: true,
        allowNull: false,
      });
      Ratings.belongsTo(models.Posts);

      models.User.hasMany(Ratings, {
        foreignKey: "created_by",
        foreignKeyConstraint: true,
        allowNull: false,
      });

      Ratings.belongsTo(models.User, {
        foreignKey: "created_by",
      });
    }
  }

  Ratings.init(
    {
      postsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ratings: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5,
          min: 1,
          notEmpty: true,
        },
        defaultValue: 1,
      },
      createdBy: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      underscored: true,
      sequelize,
      modelName: "Ratings",
      tableName: "ratings",
    }
  );
  return Ratings;
};
