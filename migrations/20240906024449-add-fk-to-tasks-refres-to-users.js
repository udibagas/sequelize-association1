"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users" }, // yang dimasukkan adalah nama table
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "UserId");
  },
};
