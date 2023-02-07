const {DataTypes} = require("sequelize");
const sequelize = require('../../database/ConexionSequelize');
require('dotenv').config();

//Alicia
sequelize.conectar();

const CargoJunta = sequelize.db.define("cargoJunta", {
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

sequelize.sync();
sequelize.desconectar();

module.exports = CargoJunta;