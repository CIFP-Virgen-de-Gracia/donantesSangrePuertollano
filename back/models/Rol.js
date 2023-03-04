const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config()

const RolUser = require('../models/RolUser');

sequelize.conectar();
//Mario
const Rol = sequelize.db.define("rol", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        
    },
    nombre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    habilities: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        defaultValue: '*'
    }
},
{
    tableName: 'roles'
});

sequelize.sync();
sequelize.desconectar();

Rol.hasMany(RolUser, {as: 'RolUser', foreignKey: 'idRol'});

module.exports = Rol;