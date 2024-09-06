"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // models = { Task: Task, User: User, UserProfile: UserProfile }
      // Task.belongsTo(models.User);
    }
  }

  Task.init(
    {
      title: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      deadline: DataTypes.DATE,
      priority: DataTypes.STRING,
      UserId: DataTypes.INTEGER, // tambahkan manual
    },
    {
      sequelize,
      modelName: "Task",
    }
  );

  return Task;
};
