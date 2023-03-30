"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("comments", "parent", {
      type: Sequelize.INTEGER,
      references: {
        model: "comments",
        key: "id",
      },
      onDelete: "RESTRICT",
    });
    await queryInterface.addConstraint("comments", {
      fields: ["parent"],
      type: "foreign key",
      name: "comments_fk_self",
      references: {
        table: "comments",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("comments", "parent");
    await queryInterface.removeConstraint("comments", "comments_fk_self");
  },
};
