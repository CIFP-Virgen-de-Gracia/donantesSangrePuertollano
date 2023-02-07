const {DataTypes} = require("sequelize");
const sequelize = require('../../database/ConexionSequelize');
require('dotenv').config();

//Alicia
sequelize.conectar();

const IntegranteJunta = sequelize.db.define("integranteJunta", {
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

sequelize.sync();
sequelize.desconectar();

module.exports = IntegranteJunta;