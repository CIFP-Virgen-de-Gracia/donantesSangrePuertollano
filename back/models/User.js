const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config()

const RolUser = require('../models/RolUser');

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
    }
},
{
    tableName: 'users'
});

sequelize.sync();
sequelize.desconectar();

User.hasMany(RolUser, {as: 'RolUser', foreignKey: 'idUser'});

module.exports = User;