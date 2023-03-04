const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

//Mario
sequelize.conectar();

const HoraCita = sequelize.db.define("horaCita", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },
    // dia: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    hora: {
        type: DataTypes.TIME,
        unique: true,
        allowNull: false
    }
},{
    tableName: 'horasCitas'
});

sequelize.sync();
sequelize.desconectar();

module.exports = HoraCita;