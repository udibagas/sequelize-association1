"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/tasks.json");

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Tasks", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Tasks",
      {}, // { status: true}  => DELETE FROM "Users" WHERE status = true
      {
        truncate: true, // TRUNCATE TABLE "Tasks" = DELETE FROM "Users"
        restartIdentity: true, // TRUNCATE TABLE "Tasks" RESTART IDENTITY
        cascade: true, // TRUNCATE TABLE "Tasks" RESTART IDENTITY CASCADE
      }
    );
  },
};
