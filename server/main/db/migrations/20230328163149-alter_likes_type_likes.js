"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("likes", "likeType", "like_type");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("likes", "like_type", "likeType");
  },
};
