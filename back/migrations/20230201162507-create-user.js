'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
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
      },
      emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      suscritoNewsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};