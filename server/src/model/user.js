"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.server/src/model/user.js
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          max: 15,
          min: 3,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 5,
          max: 20,
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      fullName: { type: DataTypes.STRING(100), allowNull: true },
      img: {
        type: DataTypes.STRING(500),
      },
      content: DataTypes.TEXT,
      role: {
        type: DataTypes.ENUM({
          values: ["ADMIN", "MOD", "USER"],
        }),
        defaultValue: "USER",
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verifiedAt: DataTypes.DATE,
      lastLogin: DataTypes.DATE,
    },
    {
      timestamps: true,
      underscored: true,
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
