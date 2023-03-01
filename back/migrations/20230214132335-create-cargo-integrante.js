'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cargoIntegrante', {
      idCargo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      idIntegrante: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cargoIntegrante');
  }
}; 