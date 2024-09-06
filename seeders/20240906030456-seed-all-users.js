"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/users.json");

    data.forEach((el) => {
      delete el.password;
    });

    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users");
  },
};
