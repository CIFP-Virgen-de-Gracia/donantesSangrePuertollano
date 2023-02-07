const {DataTypes} = require("sequelize");
const sequelize = require('../../database/ConexionSequelize');/* 
const CargoJunta = require('./CargoJunta'); */
require('dotenv').config();

//Alicia


module.exports = (sequelize) => { sequelize.db.define("cargoIntegrante", {
    idCargo: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false, 
    },
    idIntegrante: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false, 
    }
},
{
    timestamps: false
},
{
    tableName: 'cargoIntegrante'
});
}
/* 
CargoIntegrante.belongsTo(CargoJunta, {foreignKey: 'id'}); */
