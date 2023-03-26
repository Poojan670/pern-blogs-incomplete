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
    }
  }

  Ratings.init(
    {
      postsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "posts",
          key: "id",
        },
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
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
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
