"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("users", {
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
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,

            notNull: true,
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
        queryInterface.addConstraint("categories", {
          fields: ["created_by"],
          type: "foreign key",
          name: "category_fk_user",
          references: {
            table: "users",
            fields: ["id"],
            key: "id",
          },
        })
      )
      .then(() =>
        queryInterface.addColumn("categories", "parent", {
          type: Sequelize.INTEGER,
          references: {
            model: "categories",
            key: "id",
          },
          onDelete: "RESTRICT",
        })
      )
      .then(() =>
        queryInterface.addConstraint("categories", {
          fields: ["parent"],
          type: "foreign key",
          name: "category_fk_self",
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
  },
};
