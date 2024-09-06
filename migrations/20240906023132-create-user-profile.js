"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id", // nama column
        }, // REFERENCES "Users" (id)
        onDelete: "CASCADE", // ON DELETE CASCADE
        onUpdate: "CASCADE", // ON UPDATE CASCADE
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: "CHAR(1)",
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserProfiles");
  },
};
