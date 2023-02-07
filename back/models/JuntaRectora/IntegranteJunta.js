const {DataTypes} = require("sequelize");
const sequelize = require('../../database/ConexionSequelize');/* 
const CargoIntegrante = require("./CargoIntegrante"); */
require('dotenv').config();

//Alicia

module.exports = (sequelize) => { sequelize.db.define("integranteJunta", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido2: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'integrantesJunta',
    paranoid: true
});
}

/* 
IntegranteJunta.hasOne(CargoIntegrante, {as: 'CargoIntegrante', foreignKey: 'idIntegrante'}); */
