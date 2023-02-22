const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

//Mario
sequelize.conectar();

const CitaPasada = sequelize.db.define("citaPasada", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: false
    },
    fecha: {
        type: DataTypes.DATE,
        unique: true,
        allowNull: false
    },
    confirmada: {
        type: DataTypes.TINYINT,
        allowNull: true
    }
},
{
    tableName: 'citasPasada'
});
sequelize.sync();
sequelize.desconectar();


module.exports = CitaPasada;