
const fs = require('fs')
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const envConfigs = require('../../main/db/config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
    sequelize = new Sequelize(config.url, config);
    console.log("Connected to Database")
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, DataTypes)
db.category = require('./category')(sequelize, DataTypes)
db.blogs = require('./blogs')(sequelize, DataTypes)

db.sequelize.sync({ force: false })

module.exports = db;