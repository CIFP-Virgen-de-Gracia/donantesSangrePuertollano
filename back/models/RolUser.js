const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize')
require('dotenv').config()

sequelize.conectar();


const RolUser = sequelize.db.define("rolUser", {
    idRol: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        
    },
    idUser: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
    }
},
{
    timestamps: false
},
{
    tableName: 'rolUser' 
});

sequelize.sync();
sequelize.desconectar();

module.exports = RolUser;