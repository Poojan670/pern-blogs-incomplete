require('dotenv').config()

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'node_migrations',
        migrationStorageTableSchema: 'info',
        logging: false,
        define: {
            freezeTableName: false,
            underscored: false,
            charset: 'utf8',
            syncOnAssociation: false
        }
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'node_migrations',
        migrationStorageTableSchema: 'info',
        logging: false,
        define: {
            freezeTableName: false,
            underscored: false,
            charset: 'utf8',
            syncOnAssociation: false
        }
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'node_migrations',
        migrationStorageTableSchema: 'info',
        logging: false,
        define: {
            freezeTableName: false,
            underscored: false,
            charset: 'utf8',
            syncOnAssociation: false
        }
    },
}