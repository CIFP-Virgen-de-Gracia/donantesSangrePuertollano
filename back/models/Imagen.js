const { DataTypes } = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

const Noticias = require('../models/Noticias');

//Isa
const Imagen = sequelize.db.define("imagenes", {
    idNoticia: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,

    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        tableName: 'imagenes'
    });

sequelize.sync();
sequelize.desconectar();

module.exports = Imagen;
