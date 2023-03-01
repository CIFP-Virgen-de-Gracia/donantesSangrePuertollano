const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();
//Alejandro

sequelize.conectar();

const Galeria = sequelize.db.define("galeria", {
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
    timestamps: false
},
{
    tableName: 'galeria'
});

sequelize.sync();
sequelize.desconectar();

module.exports = Galeria;