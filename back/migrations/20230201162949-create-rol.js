'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};