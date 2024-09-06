const express = require("express");
const app = express();
const port = 3000;
const { User, Task, UserProfile, sequelize } = require("./models");
const { Op } = require("sequelize");
const { hashSync, compareSync } = require("bcrypt");

app.get("/", async (req, res) => {
  try {
    // const user = await User.findOne();
    // const profile = await UserProfile.findOne({
    //   where: { userId: user.id },
    // });
    // LAZY LOADING
    // const profile = await user.getUserProfile();
    // const tasks = await user.getTasks();
    // const taskCount = await user.countTasks();
    // res.json({ user, profile, taskCount, tasks });

    // EAGER LOADING
    const user = await User.findOne({
      include: { all: true },
      // include: {
      //   // model: UserProfile,
      //   // as: "Profile",
      //   association: "Profile",
      // },
      // include: "Tasks", // string
      // include: UserProfile, // models
      // include: {
      //   model: Task,
      //   attributes: ["title", "status"],
      //   where: { status: false },
      // }, // object
      // include: [UserProfile, Task], // array of model
      // include: ["UserProfile", "Tasks"], // array of string
      // include: [
      //   {
      //     model: UserProfile,
      //     attributes: ["firstName"],
      //   },
      //   {
      //     model: Task,
      //     attributes: ["title", "status"],
      //     where: { status: false },
      //   },
      // ],
    });

    res.json(user);
  } catch (error) {
    console.log(error.stack);
    res.send(error.message);
  }
});

app.get("/summary", async (req, res) => {
  try {
    const summary = await Task.summary();
    res.json(summary);
  } catch (error) {
    console.log(error.stack);
    res.send(error.message);
  }
});

app.get("/tasks", async (req, res) => {
  const { search } = req.query;

  const options = {
    where: {},
  };

  if (search) {
    options.where.title = {
      [Op.iLike]: `%${search}%`,
    };
  }

  try {
    const tasks = await Task.findAll(options);

    res.json(tasks);
  } catch (error) {
    console.log(error.stack);
    res.send(error.message);
  }
});

app.get("/register", async (req, res) => {
  try {
    // req.body
    const data = {
      email: "user10@mail.com",
      username: "user10",
      password: "rahasia",
    };

    const newUser = await User.create(data);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/change-password/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // const data = await User.update(
    //   { password: "secret" },
    //   {
    //     where: { id },
    //     returning: true,
    //     individualHooks: true,
    //   }
    // );
    const user = await User.findByPk(id);
    await user.update({ password: "secret" });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/login", async (req, res) => {
  const credential = {
    email: "user1@mail.com",
    password: "secretdqwdw",
  };

  try {
    const user = await User.findOne({ where: { email: credential.email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!compareSync(credential.password, user.password)) {
      throw new Error("Invalid email or password");
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
