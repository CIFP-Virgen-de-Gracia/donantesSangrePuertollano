'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.RolUser, {as: 'RolUser', foreignKey: 'idUser'});
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    passwd: DataTypes.STRING,
    codRecPasswd: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};