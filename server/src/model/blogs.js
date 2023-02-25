'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blogs.hasOne(models.Category, {
        foreignKey: "category_id"
      })
      models.Category.hasMany(Blogs);


      Blogs.hasOne(models.User, {
        foreignKey: "user_id"
      })
      models.User.hasMany(Blogs);
    }
  }
  Blogs.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      validate: {
        min: 10
      }
    },
    description: DataTypes.TEXT,
    paragraph1: DataTypes.TEXT,
    isLatest: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Blogs',
    tableName: 'blogs'
  });

  return Blogs;
};


