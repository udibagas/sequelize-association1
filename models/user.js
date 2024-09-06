"use strict";
const { hashSync } = require("bcrypt");
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
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      // hooks: {
      //   beforeCreate: (instance, options) => {
      //     instance.password = hashSync(instance.password, 10);
      //   },
      // },
    }
  );

  User.addHook("afterCreate", (instance) => {
    console.log(`Kirim email ke ${instance.email}`);
  });

  // beforeSave = beforeCreate & beforeUpdate
  User.beforeSave((instance) => {
    instance.password = hashSync(instance.password, 10);
  });

  return User;
};
