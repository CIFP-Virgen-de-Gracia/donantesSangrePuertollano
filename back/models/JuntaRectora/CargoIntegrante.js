const {DataTypes} = require("sequelize");
const sequelize = require('../../database/ConexionSequelize');
require('dotenv').config();

//Alicia
sequelize.conectar();

const CargoIntegrante = sequelize.db.define("cargoIntegrante", {
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

sequelize.sync();
sequelize.desconectar();

module.exports = CargoIntegrante;