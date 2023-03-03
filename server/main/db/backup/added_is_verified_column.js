module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("users", "isVerified", {
      type: Sequelize.BOOLEAN,
      default: false,
    });
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("users", "isVerified");
  },
};
