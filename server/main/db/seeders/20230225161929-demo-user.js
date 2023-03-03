"use strict";
require("dotenv").config();
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        user_name: "anmol1",
        password: "$2b$10$S9hAqCspMSbwk9ZgoR1bU.AZeX8pyTXVZm9oBLSFMbnLzhMLluGhO",
        email: "anmol@gmail.com",
        is_verified: true,
        role: "ADMIN",
        content: "This is superadmin",
        full_name: "Poojan Pradhan",
        created_at: new Date(),
        updated_at: new Date(),
        verified_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
