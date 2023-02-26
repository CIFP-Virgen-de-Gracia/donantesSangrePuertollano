const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

//Mario
sequelize.conectar();

const CitaPasada = sequelize.db.define("citaPasada", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    asistido: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false
    } 
},
{
    tableName: 'citasPasadas'
});
sequelize.sync();
sequelize.desconectar();


module.exports = CitaPasada;