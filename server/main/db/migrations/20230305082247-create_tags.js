"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("tags", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          validate: {
            min: 4,
            max: 80,
            notEmpty: true,
          },
        },
        slug: Sequelize.STRING(100),
        content: Sequelize.TEXT,
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
        queryInterface.addConstraint("tags", {
          fields: ["created_by"],
          type: "foreign key",
          name: "tags_fk_user",
          references: {
            table: "users",
            fields: ["id"],
            key: "id",
          },
        })
      );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tags");
    await queryInterface.removeConstraint("tags_fk_user");
  },
};
