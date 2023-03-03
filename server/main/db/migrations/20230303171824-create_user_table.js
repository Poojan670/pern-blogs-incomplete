"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        field: "user_name",
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          max: 15,
          min: 3,
        },
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          min: 5,
          max: 20,
          notEmpty: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      fullName: {
        field: "full_name",
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      img: {
        type: Sequelize.STRING(500),
      },
      content: Sequelize.TEXT,
      role: {
        type: Sequelize.ENUM({
          values: ["ADMIN", "MOD", "USER"],
        }),
        defaultValue: "USER",
      },
      isVerified: {
        field: "is_verified",
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verifiedAt: {
        field: "verified_at",
        type: Sequelize.DATE,
      },
      lastLogin: {
        type: Sequelize.DATE,
        field: "last_login",
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
