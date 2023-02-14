'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
      Noticia.hasMany(models.Imagen, {as: 'Imagen', foreignKey: 'idNoticia'});
    }
  }
  Noticia.init({
    titulo: DataTypes.STRING,
    subtitulo: DataTypes.STRING,
    contenido: DataTypes.STRING,
    seccion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Noticia',
  });
  return Noticia;
}; 