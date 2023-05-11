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
      User.hasMany(models.Chat, {as: 'Chat', foreignKey: 'idUser', targetKey: 'id'});
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    gSanguineo: DataTypes.STRING(3),
    passwd: DataTypes.STRING,
    codRecPasswd: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};