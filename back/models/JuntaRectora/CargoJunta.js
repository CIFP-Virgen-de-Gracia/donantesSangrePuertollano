const {DataTypes} = require("sequelize");
const sequelize = require('../../database/ConexionSequelize');/* 
const CargoIntegrante = require("./CargoIntegrante"); */
require('dotenv').config();

//Alicia

module.exports = (sequelize) => { sequelize.db.define("cargoJunta", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'cargosJunta'
});

}
/* CargoJunta.hasOne(CargoIntegrante, {as: 'CargoIntegrante', foreignKey: 'idCargo'}); */

