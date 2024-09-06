"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // sequelize db:migrate
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(30), // VARCHAR(30)
        allowNull: false, // NOT NULL
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true, // UNIQUE
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // DEFAULT FALSE
      },
    });
  },

  // sequelize db:migrate:undo
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
