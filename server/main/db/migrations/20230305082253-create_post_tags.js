"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("post_tags", {
        selfGranted: {
          field: "self_granted",
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        postsId: {
          field: "posts_id",
          type: Sequelize.INTEGER,
          references: {
            model: "posts",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        tagsId: {
          field: "tags_id",
          type: Sequelize.INTEGER,
          references: {
            model: "tags",
            key: "id",
          },
          onDelete: "CASCADE",
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
        queryInterface.addConstraint("post_tags", {
          fields: ["posts_id"],
          type: "foreign key",
          name: "posts_fk_post_tags",
          references: {
            table: "posts",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint("post_tags", {
          fields: ["tags_id"],
          type: "foreign key",
          name: "tags_fk_post_tags",
          references: {
            table: "tags",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("post_tags");
    await queryInterface.removeConstraint("posts_fk_post_tags");
    await queryInterface.removeConstraint("tags_fk_post_tags");
  },
};
