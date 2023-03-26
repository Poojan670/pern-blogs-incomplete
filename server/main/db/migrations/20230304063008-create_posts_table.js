"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("posts", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            min: 10,
          },
        },
        slug: Sequelize.STRING(100),
        img: Sequelize.STRING(500),
        categoryId: {
          field: "category_id",
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,

            notNull: true,
          },
        },
        views: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
        queryInterface.addConstraint("posts", {
          fields: ["created_by"],
          type: "foreign key",
          name: "posts_fk_user",
          references: {
            table: "users",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint("posts", {
          fields: ["category_id"],
          type: "foreign key",
          name: "posts_fk_category",
          references: {
            table: "categories",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
    await queryInterface.removeConstraint("posts_fk_user");
    await queryInterface.removeConstraint("posts_fk_category");
  },
};
