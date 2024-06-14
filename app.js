const express = require("express");
const app = express();
const port = 3000;

const { User, UserProfile, Task } = require("./models");

app.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findByPk(id, {
      include: ["Profile", Task], // eager loading
    });

    console.log(user);
    // const profile = await UserProfile.findOne({
    //   where: {
    //     UserId: user.id,
    //   },
    // });
    // const profile = await user.getUserProfile(); // lazy loading
    // const tasks = await user.getTasks();
    res.send(user);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
