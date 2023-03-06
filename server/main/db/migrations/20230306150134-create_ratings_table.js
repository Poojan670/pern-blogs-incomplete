"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("ratings", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ratings: {
          type: Sequelize.INTEGER,
          validate: {
            max: 5,
            min: 1,
            notEmpty: true,
          },
          defaultValue: 1,
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
        queryInterface.addConstraint("ratings", {
          fields: ["created_by"],
          type: "foreign key",
          name: "ratings_fk_user",
          references: {
            table: "users",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint("ratings", {
          fields: ["posts_id"],
          type: "foreign key",
          name: "ratings_fk_posts",
          references: {
            table: "posts",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ratings");
    await queryInterface.removeConstraint("ratings_fk_user");
    await queryInterface.removeConstraint("ratings_fk_posts");
  },
};
