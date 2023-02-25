require('dotenv').config()

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'node_migrations',
        migrationStorageTableSchema: 'tenant'
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'node_migrations',
        migrationStorageTableSchema: 'tenant'
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'node_migrations',
        migrationStorageTableSchema: 'tenant'
    },
}