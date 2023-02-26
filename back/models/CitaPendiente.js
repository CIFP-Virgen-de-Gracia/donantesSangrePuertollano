const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

//Mario
sequelize.conectar();

const citaPendiente = sequelize.db.define("citaPendiente", {
    citaId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    cancelada: {
        type: DataTypes.TINYINT,
        defaultValue: false,
        allowNull: false
    } 
},
{
    tableName: 'citasPendientes'
});
sequelize.sync();
sequelize.desconectar();


module.exports = citaPendiente;