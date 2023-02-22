const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

//Mario
sequelize.conectar();

const CitaPendiente = sequelize.db.define("citaPendiente", {
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
    }
},
{
    tableName: 'citasPendientes'
});
sequelize.sync();
sequelize.desconectar();


module.exports = CitaPendiente;