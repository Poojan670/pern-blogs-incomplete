"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("comments", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
          type: Sequelize.TEXT,
          validate: {
            notEmpty: true,
          },
          allowNull: false,
        },
        postsId: {
          field: "posts_id",
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
            notNull: true,
          },
          references: {
            model: "posts",
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
        queryInterface.addConstraint("comments", {
          fields: ["created_by"],
          type: "foreign key",
          name: "comments_fk_user",
          references: {
            table: "users",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint("comments", {
          fields: ["posts_id"],
          type: "foreign key",
          name: "comments_fk_posts",
          references: {
            table: "posts",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comments");
    await queryInterface.removeConstraint("comments_fk_user");
    await queryInterface.removeConstraint("comments_fk_posts");
  },
};
