"use strict";
const { hashSync } = require("bcryptjs");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models = { Task, User, UserProfile }
      // define association here
      User.hasOne(models.UserProfile);
      User.hasMany(models.Task, { foreignKey: "user_id", as: "Todos" });
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
      // 1st method
      hooks: {
        // beforeCreate: (instance) => {
        //   console.log(instance, "<<< sebelum di hash");
        //   instance.password = hashSync(instance.password);
        //   console.log(instance, "<<< setelah di hash");
        // },
      },
    }
  );

  // 2nd method
  // User.addHook("beforeCreate", (instance) => {
  //   console.log(instance, "<<< sebelum di hash");
  //   instance.password = hashSync(instance.password);
  //   console.log(instance, "<<< setelah di hash");
  // });

  // 3rd method
  User.beforeCreate((instance) => {
    // console.log(instance, "<<< sebelum di hash");
    instance.password = hashSync(instance.password);
    // console.log(instance, "<<< setelah di hash");
  });

  User.afterCreate((instance) => {
    console.log(`Kirim email konfirmasi ke ${instance.email}`);
  });

  User.beforeDestroy((instance) => {
    console.log(`User ${instance.username} akan dihapus!!!`);
  });

  return User;
};
