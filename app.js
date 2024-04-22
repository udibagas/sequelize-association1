const express = require("express");
const app = express();
const port = 3000;

const { User, UserProfile, Task, sequelize } = require("./models");

sequelize.addHook("beforeCreate", (instance) => {
  console.log(
    "Ini akan dipanggil setiap kali melakukan insert data di model apapun"
  );
});

app.get("/", async (req, res) => {
  try {
    const data = await User.findAll();
    res.json(data);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

app.get("/register", async (req, res) => {
  try {
    const newUser = {
      username: "user8",
      email: "user8@mail.com",
      password: "rahasia",
    };

    const user = await User.create(newUser);
    res.json(user);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

app.get("/remove/:id", async (req, res) => {
  try {
    // const result = await User.destroy({
    //   where: { id: req.params.id },
    //   individualHooks: true,
    // });
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json(user);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
