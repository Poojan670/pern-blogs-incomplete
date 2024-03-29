"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Tags.init(
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
      content: DataTypes.TEXT,
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
      modelName: "Tags",
      tableName: "tags",
    }
  );
  return Tags;
};
