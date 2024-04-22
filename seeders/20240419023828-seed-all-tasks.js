"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/tasks.json").map((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.user_id = el.UserId;
      delete el.UserId;
      return el;
    });

    await queryInterface.bulkInsert("Tasks", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks");
  },
};
