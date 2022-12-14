module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state
        return queryInterface.changeColumn(
            'Users',
            'password',
            {
                type: Sequelize.String,
                validate: {
                    min: 5,
                    max: 20,
                    notEmpty: true
                }
            }
        );

    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
        return queryInterface.removeColumn(
            'Users',
            'isVerified'
        );
    }
}