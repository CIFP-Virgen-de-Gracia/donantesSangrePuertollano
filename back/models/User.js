const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config()

const RolUser = require('../models/RolUser');


const User = sequelize.db.define("user", {
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
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    tableName: 'users'
});

sequelize.sync();
sequelize.desconectar();

User.hasMany(RolUser, {as: 'RolUser', foreignKey: 'idUser'});

module.exports = User;