const express = require("express");
const app = express();
const port = 3000;
const { User, Task, UserProfile, sequelize } = require("./models");
const { Op } = require("sequelize");

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
    // const count = await Task.count();
    // const min = await Task.min("deadline");
    // const max = await Task.max("deadline");
    // console.log({ count, min, max });
    // res.json({ count, min, max });

    const summary = await Task.findOne({
      raw: true,
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "count"],
        [sequelize.fn("MIN", sequelize.col("deadline")), "min"],
        [
          sequelize.fn(
            "DATE_PART",
            "year",
            sequelize.fn("MAX", sequelize.col("deadline"))
          ),
          "max",
        ],
      ],
    });
    console.log(summary);
    res.send(summary);
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

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
