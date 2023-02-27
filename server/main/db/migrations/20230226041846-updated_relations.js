"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "categories", // name of the source model,
      "user_id", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );

    await queryInterface.addColumn(
      "blogs", // name of the source model,
      "user_id", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );

    await queryInterface.addColumn(
      "blogs", // name of the source model,
      "category_id", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categories", "user_id");

    await queryInterface.removeColumn("blogs", "user_id");

    await queryInterface.removeColumn("blogs", "category_id");
  },
};
