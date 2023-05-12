'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiasHoras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiasHoras.init({
    idDia: DataTypes.BIGINT,
    idHora: DataTypes.BIGINT
  }, {
    sequelize,
    tableName: 'diasHoras',
    modelName: 'DiaHora',
  });
  return DiasHoras;
};