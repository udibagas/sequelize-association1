"use strict";
const { Model, col, fn } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // models = { Task: Task, User: User, UserProfile: UserProfile }
      Task.belongsTo(models.User);
    }

    static summary() {
      return Task.findOne({
        // raw: true,
        attributes: [
          [fn("COUNT", col("*")), "count"],
          [fn("MIN", col("deadline")), "min"],
          [fn("DATE_PART", "year", fn("MAX", col("deadline"))), "max"],
        ],
      });
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
