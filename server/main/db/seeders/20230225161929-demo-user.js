"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        user_name: process.env.DEFAULT_ADMIN_USERNAME,
        password: process.env.DEFAULT_ADMIN_HASH_PASSWORD,
        email: process.env.DEFAULT_ADMIN_EMAIL,
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
