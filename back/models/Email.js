const {DataTypes} = require("sequelize");
const sequelize = require('../database/ConexionSequelize');
require('dotenv').config()

const User = require('../models/User');

sequelize.conectar();

const Email = sequelize.db.define("email", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    newsletterVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

sequelize.sync();
sequelize.desconectar();

/* Email.hasOne(User, {as: 'idUser', foreignKey: 'id'});
 */
module.exports = Email;