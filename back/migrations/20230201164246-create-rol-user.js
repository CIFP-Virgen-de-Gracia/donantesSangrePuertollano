'use strict';

const Rol = require('../models/Rol');
const User = require('../models/User');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rolesUsers', {
      idRol: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
          model: Rol,
          key: 'id'
        }
      },
      idUser: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rolesUsers');
  }
};