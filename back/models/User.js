const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config()

const RolUser = require('../models/RolUser');
const CitaPasada = require("./CitaPasada");
const CitaPendiente = require("./CitaPendiente");

//Mario
const User = sequelize.db.define("user", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codRecPasswd: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{
    tableName: 'users'
});

sequelize.sync();
sequelize.desconectar();

User.hasMany(RolUser, {as: 'RolUser', foreignKey: 'idUser'});


User.hasMany(CitaPendiente, {as: 'citasPendientes'});
CitaPendiente.belongsTo(User, {foreignKey: 'userId', as: 'user'});

User.hasMany(CitaPasada, {as: 'citasPasadas'});
CitaPasada.belongsTo(User, {foreignKey: 'userId', as: 'user'});


module.exports = User;