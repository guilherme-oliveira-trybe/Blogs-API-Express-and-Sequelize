'use strict';

module.exports = {

  /**
  *
  * @param {import('sequelize').QueryInterface } queryInterface
  * @param {import('sequelize').Sequelize } Sequelize
  */

  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.droTable('Users');
  }
};
