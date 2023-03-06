"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("post_content", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        img: Sequelize.STRING(500),

        postsId: {
          field: "posts_id",
          type: Sequelize.INTEGER,
          references: {
            model: "posts",
            key: "id",
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
        },
      })
      .then(() =>
        queryInterface.addConstraint("post_content", {
          fields: ["posts_id"],
          type: "foreign key",
          name: "posts_fk_posts_content",
          references: {
            table: "posts",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("post_content");
    await queryInterface.removeConstraint("posts_fk_posts_content");
  },
};
