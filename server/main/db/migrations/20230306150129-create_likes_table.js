"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("likes", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        likeType: {
          type: Sequelize.ENUM("LIKE", "DISLIKE"),
          defaultValue: "LIKE",
        },
        type: {
          type: Sequelize.ENUM("POST", "COMMENT"),
          defaultValue: "POST",
        },
        postsId: {
          field: "posts_id",
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "posts",
            key: "id",
          },
        },
        commentsId: {
          field: "comments_id",
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "comments",
            key: "id",
          },
        },
        createdBy: {
          field: "created_by",
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "SET NULL",
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
        queryInterface.addConstraint("likes", {
          fields: ["created_by"],
          type: "foreign key",
          name: "likes_fk_user",
          references: {
            table: "users",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint("likes", {
          fields: ["posts_id"],
          type: "foreign key",
          name: "likes_fk_posts",
          references: {
            table: "posts",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint("likes", {
          fields: ["comments_id"],
          type: "foreign key",
          name: "likes_fk_comments",
          references: {
            table: "comments",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("likes");
    await queryInterface.removeConstraint("likes_fk_user");
    await queryInterface.removeConstraint("likes_fk_posts");
    await queryInterface.removeConstraint("likes_fk_comments");
  },
};
