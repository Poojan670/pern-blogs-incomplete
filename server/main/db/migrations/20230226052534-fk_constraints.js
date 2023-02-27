"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("categories", {
      fields: ["user_id"],
      type: "foreign key",
      name: "category_fk_user",
      references: {
        table: "users",
        fields: ["id"],
        key: "id",
      },
    });

    await queryInterface.addConstraint("blogs", {
      fields: ["user_id"],
      type: "foreign key",
      name: "blogs_fk_user",
      references: {
        table: "users",
        fields: ["id"],
        key: "id",
      },
    });

    await queryInterface.addConstraint("blogs", {
      fields: ["category_id"],
      type: "foreign key",
      name: "blogs_fk_categories",
      references: {
        table: "categories",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("categories", "category_fk_user");
    await queryInterface.removeConstraint("blogs", "blogs_fk_user");
    await queryInterface.removeConstraint("blogs", "blogs_fk_categories");
  },
};
