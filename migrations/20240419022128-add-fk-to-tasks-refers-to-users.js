"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // ! yang dijadikan valua adalah nama table
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "user_id");
  },
};
