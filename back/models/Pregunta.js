'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pregunta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pregunta.init({
    enunciado: DataTypes.STRING,
    nombre_pregunta: DataTypes.STRING,
    nombre_img: DataTypes.STRING,
    respuesta: DataTypes.STRING,
    solucion_problema: DataTypes.STRING(500)
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Pregunta',
  });
  return Pregunta;
}; 