const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();
//Isa
const Imagen = require('../models/Imagen');

const Noticia = sequelize.db.define("noticias", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitulo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contenido: {
        type: DataTypes.STRING(100000000),
        allowNull: false
    },
    seccion: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'noticias'
});

sequelize.sync();
sequelize.desconectar();

Noticia.hasMany(Imagen, {as: 'Imagen', foreignKey: 'idNoticia'});

module.exports = Noticia;
