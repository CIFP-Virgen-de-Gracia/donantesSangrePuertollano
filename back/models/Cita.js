const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
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
        defaultValue: 0,
        allowNull: true
    }
},
{
    tableName: 'citas'
});
sequelize.sync();
sequelize.desconectar();


module.exports = Cita;