require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: "postgres",
    migrationStorageTableName: "node_migrations",
    migrationStorageTableSchema: "info",
    logging: false,
    define: {
      freezeTableName: false,
      underscored: true,
      charset: "utf8",
      syncOnAssociation: true,
    },
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
    migrationStorageTableName: "node_migrations",
    migrationStorageTableSchema: "info",
    logging: false,
    define: {
      freezeTableName: false,
      underscored: true,
      charset: "utf8",
      syncOnAssociation: true,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    migrationStorageTableName: "node_migrations",
    migrationStorageTableSchema: "info",
    logging: false,
    define: {
      freezeTableName: false,
      underscored: true,
      charset: "utf8",
      syncOnAssociation: true,
    },
  },
};
