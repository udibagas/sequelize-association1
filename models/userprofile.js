"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  UserProfile.init(
    {
      userId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserProfile",
      timestamps: false,
    }
  );

  return UserProfile;
};
