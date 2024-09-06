"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task);
      User.hasOne(models.UserProfile, { foreignKey: "userId", as: "Profile" });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );

  return User;
};
