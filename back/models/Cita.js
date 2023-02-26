const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
const CitaPendiente = require("./CitaPendiente");
const CitaPasada = require('./CitaPasada');
require('dotenv').config();

//Mario
sequelize.conectar();

const Cita = sequelize.db.define("cita", {
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
        allowNull: false
    },
    donacion: {
        type: DataTypes.ENUM('sangre', 'plasma'),
        allowNull: false
    },
    confirmada: {
        type: DataTypes.TINYINT,
        allowNull: true 
    }
},
{
    tableName: 'citas'
});
sequelize.sync();
sequelize.desconectar();


Cita.hasOne(CitaPendiente, {as: 'cancelada'});
CitaPendiente.belongsTo(Cita, {foreignKey: 'citaId', as:'info'});

Cita.hasOne(CitaPasada, {as: 'asistido'});
CitaPasada.belongsTo(CitaPasada, {foreignKey: 'id', as: 'info'});

module.exports = Cita;