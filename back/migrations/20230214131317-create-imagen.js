'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagenes', {
      idNoticia: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('imagenes');
  }
}; 