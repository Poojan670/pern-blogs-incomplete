"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("post_tags", "posts_id", "post_id");
    await queryInterface.renameColumn("post_tags", "tags_id", "tag_id");
    await queryInterface.removeConstraint("post_tags", "posts_fk_post_tags");
    await queryInterface.removeConstraint("post_tags", "tags_fk_post_tags");
    await queryInterface.addConstraint("post_tags", {
      fields: ["post_id"],
      type: "foreign key",
      name: "posts_fk_post_tags",
      references: {
        table: "posts",
        fields: ["id"],
        key: "id",
      },
    });
    await queryInterface.addConstraint("post_tags", {
      fields: ["tag_id"],
      type: "foreign key",
      name: "tags_fk_post_tags",
      references: {
        table: "tags",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
