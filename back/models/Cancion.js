const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config();

//Isa

const Cancion = sequelize.db.define("canciones", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
        
    },
    nombre: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    letra: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    tableName: 'canciones'
});

sequelize.sync();
sequelize.desconectar();

module.exports = Cancion;