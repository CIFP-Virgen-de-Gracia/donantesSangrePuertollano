const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();
//Alejandro

sequelize.conectar();

const Pregunta = sequelize.db.define("preguntas", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },
    enunciado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_pregunta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nombre_img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    respuesta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    solucion_problema: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
},
{
    timestamps: false
},
{
    tableName: 'preguntas'
});

sequelize.sync();
sequelize.desconectar();

module.exports = Pregunta;