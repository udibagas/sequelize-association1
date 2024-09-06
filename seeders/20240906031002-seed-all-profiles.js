"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/profiles.json");

    data.forEach((el) => {
      delete el.password;
    });

    await queryInterface.bulkInsert("UserProfiles", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserProfiles");
  },
};
